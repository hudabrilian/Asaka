import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import { PluginSkeleton } from "../../components/PluginSkeleton";
import { getCurseWords, updateCurseWords } from "../../utils/api";

export const PluginAntiCurse = () => {
  const [words, setWords] = useState("");
  const [defWords, setDefwords] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      await getCurseWords(params!.id!).then(({ data }) => {
        setWords(data.words);
        setDefwords(data.words);
      });
    };

    getData();
    setLoading(false);
  }, []);

  return (
    <div>
      {!loading ? (
        <div className="flex flex-col space-y-10">
          <div className="flex flex-col space-y-5">
            <label className="font-semibold text-lg leading-none text-white">
              Curse Words List
              <span className="text-sm font-normal ml-2 text-stone-200">
                (Split each word with a comma)
              </span>
            </label>
            <div className="flex space-x-3">
              <textarea
                value={words}
                onChange={(e) => {
                  setWords(e.target.value);
                  setIsEdit(e.target.value !== defWords);
                }}
                className="w-full h-40 text-base leading-none text-white p-3 focus:outline-none focus:border-blue bg-stone-600 border-0 rounded"
              ></textarea>
            </div>
          </div>
          {isEdit && (
            <ConfirmationModal
              save={() => {
                updateCurseWords(params!.id!, words).then(() => {
                  setIsEdit(false);
                  setDefwords(words);
                  toast(`Successfully saved!`);
                });
              }}
              cancel={() => {
                setIsEdit(false);
                setWords(defWords);
              }}
            />
          )}
        </div>
      ) : (
        <PluginSkeleton />
      )}
    </div>
  );
};

// const WordStyle = (props: any) => {
//   return (
//     <div className="rounded-full border-2 border-indigo-400 flex items-center justify-center">
//       {props.word}
//       <button className="ml-1 cursor-pointer">
//         <AiOutlineClose />
//       </button>
//     </div>
//   );
// };
