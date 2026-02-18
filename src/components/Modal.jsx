// src/components/Modal.jsx
export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-[#112240]/50 via-[#112240]/10 to-[#0a192f]/90 p-6 rounded-xl w-full max-w-md relative border-2 border-yellow-700 shadow-lg">
        
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="btn-modal-close absolute top-3 right-3 transition"
          aria-label="Close modal"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
