import { useState } from "react";
import Modal from "./components/Modal";
import { Toaster } from "react-hot-toast";
import { Github } from "lucide-react";

const App = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <main className="bg-paleBlue flex min-h-screen flex-col items-center justify-start">
      <header className="flex w-full max-w-6xl items-center justify-between py-4">
        <p className="text-3xl font-bold"> Customer Labs</p>
        <a
          href="https://github.com/Avinash-Tallapaneni/customerLabs_assignment"
          target="_blank"
          className="flex items-center space-x-2"
        >
          <span className="font-semibold">Source code found here</span>
          <Github />
        </a>
      </header>
      <div className="flex h-full w-full flex-1 items-center justify-center">
        <button
          className="text-paleBlue bg-aqua hover:bg-teal focus:ring-teal rounded-lg px-6 py-3 shadow-lg transition-colors duration-300 focus:ring-2"
          onClick={() => setIsActive((prev) => !prev)}
        >
          Save Segment
        </button>
      </div>
      <Modal isActive={isActive} onClose={() => setIsActive(false)} />
      <Toaster position="top-right" />
    </main>
  );
};

export default App;
