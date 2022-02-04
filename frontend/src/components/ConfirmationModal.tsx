export const ConfirmationModal = (props: any) => {
  return (
    <>
      <div className="bg-stone-700 sticky bottom-10 z-20 rounded-xl px-10 py-4 my-10 transition-all ease-in-out translate-y-5">
        <div className="flex justify-between items-center">
          <div className="select-none">
            Changes detected! Please save or cancel.
          </div>
          <div className="flex space-x-5">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-xl"
              onClick={() => {
                props.save();
              }}
            >
              Save
            </button>
            <button
              className="bg-stone-600 hover:bg-stone-500 px-5 py-2 rounded-xl"
              onClick={() => {
                props.cancel();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
