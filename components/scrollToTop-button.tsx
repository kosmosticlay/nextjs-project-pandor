export default function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div
      onClick={scrollToTop}
      className="size-10 flex-center rounded-sm bg-yellow-400 fixed bottom-28 right-5 z-10"
    >
      ▲
    </div>
  );
}
