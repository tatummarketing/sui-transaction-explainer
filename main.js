const form = document.getElementById('lookup-form');
const digestInput = document.getElementById('digest-input');
const endpointInput = document.getElementById('endpoint-input');
const apiKeyInput = document.getElementById('api-key-input');
const statusEl = document.getElementById('status');
const resultsEl = document.getElementById('results');
const submitButton = document.getElementById('submit-button');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const digest = digestInput.value.trim();

  if (!digest) {
    setStatus('Please enter a transaction digest.', 'error');
    return;
  }

  const endpoint = endpointInput.value.trim();
  const apiKey = apiKeyInput.value.trim();

  setStatus('Fetching transaction details...');
  submitButton.disabled = true;
  resultsEl.hidden = true;

  try {
    const payload = {
      jsonrpc: '2.0',
      id: 1,
      method: 'sui_getTransactionBlock',
      params: [
        digest,
        {
          showInput: true,
          showEffects: true,
          showEvents: true,
          showObjectChanges: true,
          showBalanceChanges: true,
        },
      ],
    };

    const headers = {
      accept: 'application/json',
      'content-type': 'application/json',
    };

    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`RPC request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || 'RPC returned an error');
    }

    renderResults(data.result);
    setStatus('Success — see the breakdown below.');
  } catch (error) {
    console.error(error);
    setStatus(`Unable to fetch transaction: ${error.message}`);
    resultsEl.hidden = true;
  } finally {
    submitButton.disabled = false;
  }
});

function setStatus(message) {
  statusEl.textContent = message;
}

function renderResults(result) {
  if (!result) {
    setStatus('No result returned from RPC.');
    return;
  }

  resultsEl.innerHTML = '';
  resultsEl.hidden = false;

  resultsEl.append(
    createBlock('Transaction', renderTransactionSummary(result)),
    createBlock('Gas + balance', renderCostSummary(result)),
    createBlock('Object changes', renderObjectChanges(result.objectChanges)),
    createBlock('Events', renderEvents(result.events)),
    createBlock('Raw response', `<pre>${escapeHtml(JSON.stringify(result, null, 2))}</pre>`)
  );
}

function renderTransactionSummary(result) {
  const status = result?.effects?.status?.status;
  const statusError = result?.effects?.status?.error;
  const sender = result?.transaction?.data?.sender || 'Unknown sender';
  const digest = result?.digest || '—';
  const timestamp = result?.timestampMs ? new Date(Number(result.timestampMs)).toLocaleString() : 'Not available';

  const items = [
    `<div class="flex-row"><span class="tag">Digest: ${digest}</span><span class="tag">Sender: ${sender}</span></div>`,
    `<div class="flex-row">${renderStatusBadge(status)}<span class="tag">Timestamp: ${timestamp}</span></div>`,
  ];

  if (statusError) {
    items.push(`<p class="badge-fail">Error: ${escapeHtml(statusError)}</p>`);
  }

  return items.join('\n');
}

function renderStatusBadge(status) {
  const normalized = (status || '').toLowerCase();

  if (normalized === 'success') {
    return '<span class="tag badge-success">✔ Success</span>';
  }

  if (normalized === 'failure' || normalized === 'failed') {
    return '<span class="tag badge-fail">✖ Failed</span>';
  }

  return `<span class="tag">Status: ${status || 'Unknown'}</span>`;
}

function renderCostSummary(result) {
  const gasUsed = result?.effects?.gasUsed;
  const balanceChanges = result?.balanceChanges || result?.effects?.balanceChanges || [];

  const pieces = [];

  if (gasUsed) {
    const netCost = calcNetGasCost(gasUsed);
    pieces.push(
      `<p><strong>Gas breakdown</strong></p>` +
        `<ul class="summary-list">` +
        `<li>Computation: ${formatSuiAmount(gasUsed.computationCost)}</li>` +
        `<li>Storage: ${formatSuiAmount(gasUsed.storageCost)}</li>` +
        `<li>Rebate: ${formatSuiAmount(gasUsed.storageRebate)}</li>` +
        (gasUsed.nonRefundableStorageFee
          ? `<li>Non-refundable storage fee: ${formatSuiAmount(gasUsed.nonRefundableStorageFee)}</li>`
          : '') +
        `<li><strong>Net gas cost:</strong> ${formatSui(netCost)}</li>` +
        `</ul>`
    );
  }

  if (balanceChanges.length > 0) {
    const lines = balanceChanges.map((change) => {
      const owner = describeOwner(change.owner);
      const amount = formatCoinAmount(change.coinType, change.amount);
      let direction;

      try {
        direction = BigInt(change.amount || '0') >= 0n ? '+' : '-';
      } catch {
        direction = '±';
      }

      const verb = direction === '+' ? 'Received' : direction === '-' ? 'Spent' : 'Changed';
      return `<li>${verb} ${amount} (${change.coinType}) for ${owner}</li>`;
    });

    pieces.push(`<p><strong>Balance changes</strong></p><ul class="summary-list">${lines.join('')}</ul>`);
  } else {
    pieces.push('<p>No balance changes reported.</p>');
  }

  return pieces.join('\n');
}

function renderObjectChanges(objectChanges = []) {
  if (!objectChanges || objectChanges.length === 0) {
    return '<p>No object changes returned.</p>';
  }

  const lines = objectChanges.map((change) => `<li>${describeObjectChange(change)}</li>`);
  return `<ul class="summary-list">${lines.join('')}</ul>`;
}

function renderEvents(events = []) {
  if (!events || events.length === 0) {
    return '<p>No events.</p>';
  }

  const lines = events.map((event, index) => {
    const type = event.type || 'Unknown';
    const sender = event.sender ? ` (sender: ${event.sender})` : '';
    return `<li>Event ${index + 1}: ${escapeHtml(type)}${escapeHtml(sender)}</li>`;
  });

  return `<ul class="summary-list">${lines.join('')}</ul>`;
}

function describeObjectChange(change) {
  if (!change) return 'Unknown change';

  const owner = describeOwner(change.owner);
  const type = change.objectType || 'object';

  switch (change.type) {
    case 'created':
      return `Created ${type} ${change.objectId} owned by ${owner}.`;
    case 'mutated':
      return `Mutated ${type} ${change.objectId} now owned by ${owner}.`;
    case 'transferred':
      return `Transferred ${type} ${change.objectId} to ${owner}.`;
    case 'deleted':
      return `Deleted ${type} ${change.objectId}.`;
    case 'wrapped':
      return `Wrapped ${type} ${change.objectId} into another object.`;
    default:
      return `${change.type || 'Change'} on ${type} ${change.objectId || ''} (${owner}).`;
  }
}

function describeOwner(owner) {
  if (!owner) return 'unknown owner';
  if (owner.AddressOwner) return `address ${owner.AddressOwner}`;
  if (owner.ObjectOwner) return `object ${owner.ObjectOwner}`;
  if (owner.Shared) {
    const version = owner.Shared.initial_shared_version || owner.Shared.initialSharedVersion;
    return `shared object${version ? ` (initial v${version})` : ''}`;
  }
  if (owner.Immutable) return 'immutable';
  return 'unknown owner';
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatSuiAmount(value) {
  if (value === undefined || value === null) return '—';
  return formatSui(BigInt(value));
}

function formatCoinAmount(coinType, rawAmount) {
  if (coinType && coinType.endsWith('::sui::SUI')) {
    return formatSui(rawAmount);
  }

  try {
    const big = BigInt(rawAmount);
    const direction = big >= 0n ? '+' : '-';
    return `${direction}${big.toString()} units`;
  } catch {
    return rawAmount;
  }
}

function formatSui(raw) {
  try {
    const amount = typeof raw === 'bigint' ? raw : BigInt(raw);
    const negative = amount < 0n;
    const abs = negative ? -amount : amount;
    const whole = abs / 1_000_000_000n;
    const fractional = abs % 1_000_000_000n;
    const fractionalStr = fractional.toString().padStart(9, '0').replace(/0+$/, '');
    const value = fractionalStr ? `${whole}.${fractionalStr}` : `${whole}`;
    return `${negative ? '-' : ''}${value} SUI`;
  } catch {
    return String(raw);
  }
}

function calcNetGasCost(gasUsed) {
  const computation = BigInt(gasUsed?.computationCost ?? 0);
  const storage = BigInt(gasUsed?.storageCost ?? 0);
  const rebate = BigInt(gasUsed?.storageRebate ?? 0);
  const nonRefundable = BigInt(gasUsed?.nonRefundableStorageFee ?? 0);
  return computation + storage + nonRefundable - rebate;
}

function createBlock(title, content) {
  const block = document.createElement('section');
  block.className = 'result-block';
  block.innerHTML = `<h3>${title}</h3>${content}`;
  return block;
}
