import { forwardRef } from "react";

const DeleteDeckModal = forwardRef((props, ref) => {
  const confirmDeleteHandler = () => {
    props.onConfirm();
  };

  const cancelDeleteHandler = () => {
    ref.current.close();
    props.onCancel();
  };

  return (
    <dialog
      ref={ref}
      className="bg-white p-5 rounded-lg w-[400px] [&::backdrop]:bg-black/50"
    >
      <h2 className="text-gray-500 text-xl font-semibold">
        Your deck will be permanently deleted. Do you want to continue?
      </h2>
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={confirmDeleteHandler}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
        >
          Yes
        </button>
        <button
          onClick={cancelDeleteHandler} // Close when clicking "No"
          className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
        >
          No
        </button>
      </div>
    </dialog>
  );
});

export default DeleteDeckModal;
