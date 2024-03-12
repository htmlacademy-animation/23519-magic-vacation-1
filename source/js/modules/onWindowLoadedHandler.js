export default () => {
  window.onload = () => {
    setTimeout(() => {
      document.body.classList.add("loaded");
    }, 300);
  };
};
