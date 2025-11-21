const form = document.getElementById('lookup-form');
const digestInput = document.getElementById('digest-input');
const apiKeyInput = document.getElementById('api-key-input');
const apiKeyContainer = document.getElementById('api-key-container');
const apiKeySaved = document.getElementById('api-key-saved');
const apiKeyEditButton = document.getElementById('api-key-edit');
const statusEl = document.getElementById('status');
const resultsEl = document.getElementById('results');
const submitButton = document.getElementById('submit-button');
const DEFAULT_ENDPOINT = 'https://sui-mainnet.gateway.tatum.io/';
const API_KEY_HINTS = [
  't-646356f5xxxxxx001c17dc64-xxxxxxxxxxxxxxxxxxxxxx',
  't-88392fd1xxxxxx99a5edc74-xxxxxxxxxxxxxxxxxxxxxx',
  't-4e3c4afexxxxxx7485d2c01-xxxxxxxxxxxxxxxxxxxxxx',
];

const randomHint = API_KEY_HINTS[Math.floor(Math.random() * API_KEY_HINTS.length)];
apiKeyInput.placeholder = randomHint;

apiKeyInput.addEventListener('blur', () => {
  if (apiKeyInput.value.trim()) {
    collapseApiKeyField();
  }
});

apiKeyInput.addEventListener('input', () => {
  if (!apiKeyInput.value.trim()) {
    expandApiKeyField(false);
  }
});

apiKeyEditButton.addEventListener('click', () => {
  expandApiKeyField(true);
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const digest = digestInput.value.trim();

  if (!digest) {
    setStatus('Please enter a transaction digest.', 'error');
    return;
  }

  const endpoint = DEFAULT_ENDPOINT;
  const apiKey = apiKeyInput.value.trim();

  setStatus('Fetching transaction details...');
  submitButton.disabled = true;
  resultsEl.hidden = true;

  try {
    const headers = {
      accept: 'application/json',
      'content-type': 'application/json',
    };

    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }

    const { result: baseResult, warning } = await fetchTransactionWithFallback(endpoint, headers, digest);
    const enriched = await enrichTransactionResult(baseResult, endpoint, headers);
    renderResults(enriched);
    setStatus(warning || 'Success — see the breakdown below.');
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

function collapseApiKeyField() {
  if (!apiKeyContainer.classList.contains('collapsed')) {
    apiKeyContainer.classList.add('collapsed');
    apiKeySaved.setAttribute('aria-hidden', 'false');
  }
}

function expandApiKeyField(focusInput) {
  apiKeyContainer.classList.remove('collapsed');
  apiKeySaved.setAttribute('aria-hidden', 'true');
  if (focusInput) {
    apiKeyInput.focus();
    apiKeyInput.select();
  }
}

async function fetchTransactionWithFallback(endpoint, headers, digest) {
  const optionCandidates = [
    {
      showInput: true,
      showEffects: true,
      showEvents: true,
      showObjectChanges: true,
      showBalanceChanges: true,
    },
    {
      showInput: true,
      showEffects: true,
      showObjectChanges: true,
      showBalanceChanges: true,
    },
    {
      showEffects: true,
      showObjectChanges: true,
      showBalanceChanges: true,
    },
    {
      showEffects: true,
      showBalanceChanges: true,
    },
    {
      showEffects: true,
    },
    null,
  ];

  let lastError;
  let warningMessage = null;
  for (let i = 0; i < optionCandidates.length; i++) {
    const options = optionCandidates[i];
    try {
      const result = await fetchTransaction(endpoint, headers, digest, options);
      if (i > 0) {
        warningMessage = 'Some RPC fields are unavailable on this endpoint. Showing the most complete data we could fetch.';
      }
      return { result, warning: warningMessage };
    } catch (error) {
      lastError = error;
      if (!isRetryableRpcError(error) || i === optionCandidates.length - 1) {
        throw error;
      }
      console.warn('RPC options rejected, retrying with a leaner payload:', error);
    }
  }

  throw lastError;
}

async function fetchTransaction(endpoint, headers, digest, options) {
  const params = options ? [digest, options] : [digest];

  const payload = {
    jsonrpc: '2.0',
    id: 1,
    method: 'sui_getTransactionBlock',
    params,
  };

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
    const err = new Error(data.error.message || 'RPC returned an error');
    err.rpcError = data.error;
    throw err;
  }

  return data.result;
}

function isRetryableRpcError(error) {
  if (!error) return false;
  if (error.name === 'AbortError' || error.message === 'Failed to fetch') {
    return true;
  }
  const message = (error.rpcError?.message || error.message || '').toLowerCase();
  if (!message) return false;
  return (
    message.includes('invalid response from upstream') ||
    message.includes('timeout') ||
    message.includes('timed out') ||
    message.includes('unavailable') ||
    message.includes('unsupported') ||
    message.includes('not ready')
  );
}

async function enrichTransactionResult(result, endpoint, headers) {
  const [checkpointInfo, objectDetails, balanceSnapshots] = await Promise.all([
    fetchCheckpointInfo(result?.checkpoint, endpoint, headers),
    fetchObjectDetails(result?.objectChanges, endpoint, headers),
    fetchCurrentBalances(result?.balanceChanges, endpoint, headers),
  ]);

  return {
    ...result,
    checkpointInfo,
    objectDetails,
    balanceSnapshots,
  };
}

async function fetchCheckpointInfo(checkpoint, endpoint, headers) {
  if (!checkpoint) return null;
  try {
    return await callRpc(endpoint, headers, 'sui_getCheckpoint', [checkpoint]);
  } catch (error) {
    console.warn('Unable to fetch checkpoint info', error);
    return null;
  }
}

async function fetchObjectDetails(objectChanges = [], endpoint, headers) {
  const ids = Array.from(
    new Set(
      (objectChanges || [])
        .map((change) => change?.objectId)
        .filter(Boolean)
    )
  );

  if (ids.length === 0) {
    return {};
  }

  try {
    const response = await callRpc(endpoint, headers, 'sui_multiGetObjects', [
      ids,
      {
        showType: true,
        showOwner: true,
        showContent: false,
        showDisplay: false,
        showBcs: false,
      },
    ]);

    const details = {};
    response.forEach((entry) => {
      if (entry?.error) return;
      if (entry?.data?.objectId) {
        details[entry.data.objectId] = entry.data;
      }
    });

    return details;
  } catch (error) {
    console.warn('Unable to fetch object details', error);
    return {};
  }
}

async function fetchCurrentBalances(balanceChanges = [], endpoint, headers) {
  const targets = [];

  (balanceChanges || []).forEach((change) => {
    const ownerAddress = change?.owner?.AddressOwner;
    if (!ownerAddress || !change?.coinType) return;
    const key = `${ownerAddress}::${change.coinType}`;
    targets.push({ key, owner: ownerAddress, coinType: change.coinType });
  });

  const uniqueTargets = Array.from(new Map(targets.map((t) => [t.key, t])).values());

  if (uniqueTargets.length === 0) return [];

  const results = [];
  for (const target of uniqueTargets) {
    try {
      const balance = await callRpc(endpoint, headers, 'sui_getBalance', [target.owner, target.coinType]);
      results.push({
        owner: target.owner,
        coinType: target.coinType,
        totalBalance: balance?.totalBalance ?? null,
      });
    } catch (error) {
      console.warn('Unable to fetch balance for', target, error);
    }
  }

  return results;
}

async function callRpc(endpoint, headers, method, params) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params,
    }),
  });

  if (!response.ok) {
    throw new Error(`RPC request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (data.error) {
    const err = new Error(data.error.message || 'RPC returned an error');
    err.rpcError = data.error;
    throw err;
  }

  return data.result;
}

function renderResults(result) {
  if (!result) {
    setStatus('No result returned from RPC.');
    return;
  }

  resultsEl.innerHTML = '';
  resultsEl.hidden = false;

  resultsEl.append(
    createBlock('Transaction', renderTransactionSummary(result), generateTransactionCallout(result)),
    createBlock('Gas + balance', renderCostSummary(result), generateCostCallout(result)),
    createBlock(
      'Object changes',
      renderObjectChanges(result.objectChanges, result.objectDetails),
      generateObjectCallout(result.objectChanges)
    ),
    createBlock('Events', renderEvents(result.events), generateEventsCallout(result.events)),
    createBlock('Raw response', renderRawResponse(result))
  );
}

function renderTransactionSummary(result) {
  const status = result?.effects?.status?.status;
  const statusError = result?.effects?.status?.error;
  const sender = result?.transaction?.data?.sender || 'Unknown sender';
  const digest = result?.digest || '—';
  const timestamp = result?.timestampMs ? new Date(Number(result.timestampMs)).toLocaleString() : 'Not available';
  const checkpoint = result?.checkpoint || 'Unknown';
  const checkpointDetails = buildCheckpointDetails(result?.checkpointInfo);

  const items = [
    `<div class="flex-row"><span class="tag">Digest: ${digest}</span><span class="tag">Sender: ${sender}</span></div>`,
    `<div class="flex-row">${renderStatusBadge(status)}<span class="tag">Timestamp: ${timestamp}</span><span class="tag">Checkpoint: ${checkpoint}</span></div>`,
  ];

  if (checkpointDetails) {
    items.push(`<p>${escapeHtml(checkpointDetails)}</p>`);
  }

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
  const balanceSnapshots = result?.balanceSnapshots || [];

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

  if (balanceSnapshots.length > 0) {
    const lines = balanceSnapshots.map((snapshot) => {
      const formatted = formatCoinAmount(snapshot.coinType, snapshot.totalBalance ?? '—');
      return `<li>${snapshot.owner} currently holds ${formatted} (${snapshot.coinType})</li>`;
    });
    pieces.push(`<p><strong>Live balances</strong></p><ul class="summary-list">${lines.join('')}</ul>`);
  }

  return pieces.join('\n');
}

function renderObjectChanges(objectChanges = [], objectDetails = {}) {
  if (!objectChanges || objectChanges.length === 0) {
    return '<p>No object changes returned.</p>';
  }

  const lines = objectChanges.map((change) => {
    const detail = change?.objectId ? objectDetails[change.objectId] : undefined;
    return `<li>${describeObjectChange(change, detail)}</li>`;
  });
  return `<ul class="summary-list">${lines.join('')}</ul>`;
}

const EVENT_DESCRIPTIONS = {
  // Core Sui / 0x2 framework events
  'coin::MintEvent': 'New coins got minted for a specific coin type (supply increased).',
  'coin::BurnEvent': 'Coins were burned and removed from circulation.',
  'coin::TransferEvent': 'Generic coin handoff between owners.',
  'coin::BalanceChangeEvent': 'Balance delta emitted for bookkeeping (used by wallets/indexers).',
  'pay::PayEvent': 'Multi-recipient coin transfer that spent a coin vector.',
  'pay::PaySuiEvent': 'Batch payout using pure SUI coins.',
  'pay::PayAllSuiEvent': 'Sent the entire gas coin to one or more recipients.',
  'sui::NewEpochEvent': 'Network advanced to a new epoch; validator set or parameters may have changed.',
  'sui::EndOfEpochEvent': 'Epoch wrapped up and checkpoints/finalization were completed.',
  'sui::MoveCallMetricsEvent': 'Diagnostic stats for a programmable transaction step.',
  'package::UpgradeEvent': 'A Move package upgrade (new bytecode) landed on-chain.',
  'package::PublisherEvent': 'A new package got published with the referenced upgrade capability.',
  'validator::AddStakeEvent': 'Validator staking pool accepted additional delegated stake.',
  'validator::WithdrawStakeEvent': 'Delegated stake (principal or rewards) was withdrawn from a validator.',
  'staking_pool::BalanceConvertedEvent': 'Rewards inside a staking pool were converted to balance units.',
  'staking_pool::JoinEvent': 'A participant joined a staking pool with fresh stake.',
  'staking_pool::LeaveEvent': 'Stake exited the pool (either withdrawal or re-delegation).',
  // Example DeFi/custom events that show up frequently
  'events::AssetSwap':
    'Indicates a swap between two assets inside the referenced pool — usually logging the amounts in/out.',
  'campaign::LoginEvent':
    'Fired when a campaign participant signs in, recording the actor and context.',
  'clob_v2::OrderFillEvent': 'Central limit order book fill: maker/taker amounts are logged.',
  'farm::HarvestEvent': 'Yield-farming reward distribution to the farmer wallet.',
  'vault::DepositEvent': 'Assets were deposited into a vault strategy.',
  'vault::WithdrawEvent': 'Assets withdrawn from a vault back to the user.',
};

function renderEvents(events = []) {
  if (!events || events.length === 0) {
    return '<p>No events.</p>';
  }

  const lines = events.map((event, index) => {
    const info = describeEventType(event.type);
    const sender = event.sender ? ` — sender: ${escapeHtml(shortenValue(event.sender))}` : '';
    return `<li>Event ${index + 1}: ${escapeHtml(info)}${sender}</li>`;
  });

  return `<ul class="summary-list">${lines.join('')}</ul>`;
}

function generateTransactionCallout(result) {
  if (!result) return '';
  const sender = shortenValue(result?.transaction?.data?.sender) || 'an unknown sender';
  const digest = shortenValue(result?.digest);
  const status = (result?.effects?.status?.status || 'unknown').toLowerCase();
  const error = result?.effects?.status?.error;

  if (status === 'success') {
    return `Transaction ${digest} succeeded for ${sender}.`;
  }

  if (status === 'failure' || status === 'failed') {
    return `Transaction ${digest} failed for ${sender} because ${error || 'the chain returned an error'}.`;
  }

  return `Status for transaction ${digest} from ${sender} is ${status || 'unknown'}.`;
}

function generateCostCallout(result) {
  const gasUsed = result?.effects?.gasUsed;
  if (!gasUsed) {
    return 'Gas information was not returned by the RPC.';
  }
  const net = calcNetGasCost(gasUsed);
  const formatted = formatSui(net);
  const balanceCount = (result?.balanceChanges || []).length;
  if (balanceCount === 0) {
    return `Net gas cost: ${formatted}. No explicit balance deltas were returned.`;
  }
  return `Net gas cost: ${formatted}. There were ${balanceCount} recorded balance change${
    balanceCount === 1 ? '' : 's'
  }.`;
}

function generateObjectCallout(objectChanges = []) {
  const count = objectChanges?.length || 0;
  if (count === 0) {
    return 'No objects were reported as created, mutated, or transferred.';
  }
  const created = objectChanges.filter((c) => c.type === 'created').length;
  const mutated = objectChanges.filter((c) => c.type === 'mutated').length;
  const transferred = objectChanges.filter((c) => c.type === 'transferred').length;
  return `${created} created, ${mutated} mutated, and ${transferred} transferred object${
    transferred === 1 ? '' : 's'
  }.`;
}

function generateEventsCallout(events = []) {
  const count = events?.length || 0;
  if (count === 0) {
    return 'No events were emitted.';
  }
  const modules = Array.from(
    new Set(
      events
        .map((event) => parseMoveType(event.type)?.module)
        .filter(Boolean)
    )
  );
  const senders = Array.from(
    new Set(
      events
        .map((event) => shortenValue(event.sender))
        .filter(Boolean)
    )
  );
  const moduleText = modules.length > 0 ? modules.join(', ') : 'various modules';
  const descriptions = events
    .map((event) => getEventDescription(event.type))
    .filter(Boolean);
  const details = descriptions.length > 0 ? ` Detail: ${descriptions[0]}` : '';
  if (count === 1) {
    const moduleDetail = modules[0] ? ` from ${modules[0]}` : '';
    const senderDetail = senders[0] ? ` by ${senders[0]}` : '';
    return `One event${moduleDetail}${senderDetail}.${details || ''}`.trim();
  }
  return `${count} events lit up ${moduleText}, triggered by ${senders.length || 'several'} actor${
    senders.length === 1 ? '' : 's'
  }.${details}`;
}

function buildCheckpointDetails(checkpointInfo) {
  if (!checkpointInfo) return null;
  const proposer = checkpointInfo.proposer || 'Unknown proposer';
  const checkpointTime = checkpointInfo.timestampMs
    ? new Date(Number(checkpointInfo.timestampMs)).toLocaleString()
    : null;

  const parts = [`Proposer: ${proposer}`];
  if (checkpointTime) {
    parts.push(`Checkpoint time: ${checkpointTime}`);
  }

  return parts.join(' — ');
}

function describeObjectChange(change, detail) {
  if (!change) return 'Unknown change';

  const owner = describeOwner(change.owner);
  const detailType = detail?.type || detail?.content?.type;
  const type = change.objectType || detailType || 'object';
  const version = detail?.version ? ` (v${detail.version})` : '';

  switch (change.type) {
    case 'created':
      return `Created ${type}${version} ${change.objectId} owned by ${owner}.`;
    case 'mutated':
      return `Mutated ${type}${version} ${change.objectId} now owned by ${owner}.`;
    case 'transferred':
      return `Transferred ${type}${version} ${change.objectId} to ${owner}.`;
    case 'deleted':
      return `Deleted ${type}${version} ${change.objectId}.`;
    case 'wrapped':
      return `Wrapped ${type}${version} ${change.objectId} into another object.`;
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

function parseMoveType(moveType) {
  if (!moveType) return null;
  const parts = moveType.split('::');
  if (parts.length < 3) {
    return { address: moveType, module: moveType, name: moveType };
  }
  const [address, module, ...rest] = parts;
  const struct = rest.join('::');
  return { address, module, name: struct };
}

function describeEventType(type) {
  if (!type) return 'Unknown event';
  const parsed = parseMoveType(type);
  if (!parsed) return type;
  const shortAddress = shortenValue(parsed.address);
  return `${parsed.module || 'module'}::${parsed.name || 'event'} (package ${shortAddress})`;
}

function getEventDescription(type) {
  if (!type) return '';
  const parsed = parseMoveType(type);
  if (!parsed) return '';
  const module = parsed.module || '';
  const struct = parsed.name || '';
  const baseStruct = struct.includes('<') ? struct.slice(0, struct.indexOf('<')) : struct;
  const key = `${module}::${struct}`;
  const baseKey = `${module}::${baseStruct}`;
  return EVENT_DESCRIPTIONS[key] || EVENT_DESCRIPTIONS[baseKey] || '';
}

function shortenValue(value, visible = 6) {
  if (!value || typeof value !== 'string') return value;
  if (value.length <= visible * 2 + 3) return value;
  return `${value.slice(0, visible)}…${value.slice(-visible)}`;
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

function createBlock(title, content, annotation) {
  const block = document.createElement('section');
  block.className = 'result-block';
  block.innerHTML = `<h3>${title}</h3>${content}${annotation ? `<div class="callout">${escapeHtml(annotation)}</div>` : ''}`;
  return block;
}

function renderRawResponse(result) {
  return `
    <div class="raw-response">
      <details>
        <summary>Toggle raw JSON</summary>
        <pre>${escapeHtml(JSON.stringify(result, null, 2))}</pre>
      </details>
    </div>
  `;
}
