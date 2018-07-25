export const loadState = () => {
  const serialisedState = localStorage.getItem("appState");
  if (!serialisedState) {
    return null;
  }

  return JSON.parse(serialisedState);
};

export const saveState = state => {
  const serialisedState = JSON.stringify(state);
  localStorage.setItem("appState", serialisedState);
};
