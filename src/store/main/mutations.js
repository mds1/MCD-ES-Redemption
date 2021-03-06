export function setProvider(state, provider) {
  try {
    // Object.assign fails if provider is undefined
    Object.assign(state.provider, provider);
  } catch {
    state.provider = provider;
  }
}

export function setWallet(state, wallet) {
  try {
    // Object.assign fails if signer is undefined
    Object.assign(state.signer, wallet.signer);
    state.userAddress = wallet.userAddress;
  } catch {
    state.signer = wallet.signer;
    state.userAddress = wallet.userAddress;
  }
}

export function setContracts(state, contracts) {
  try {
    Object.assign(state.contracts, contracts);
  } catch {
    state.contracts = contracts;
  }
}

export function setSelectedComponents(state, components) {
  state.selectedComponents = components;
}

export function setData(state, data) {
  try {
    Object.assign(state.data, data);
  } catch {
    state.data = data;
  }
}
