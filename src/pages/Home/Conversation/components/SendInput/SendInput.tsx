import React, {
  ChangeEvent,
  ClipboardEventHandler,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  PaperAirplaneIcon,
  PlusCircleIcon,
  PhotoIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "~/configs/firebase/firebase";
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
} from "@react-query-firebase/firestore";
import useCurrentUser from "~/shared/hooks/useCurrentUser";
import ImageLists from "./components/ImageLists/ImageLists";

interface SendInputProps {
  conversationId: string;
  scrollToBottom: Function;
}

function SendInput({ conversationId, scrollToBottom }: SendInputProps) {
  const { data: currentUser } = useCurrentUser();

  const conversationRef = doc(collection(db, "chats"), conversationId);
  const conversationMutation = useFirestoreDocumentMutation(conversationRef, {
    merge: true,
  });

  const ref = collection(db, "chats", conversationId, "messages");
  const mutation = useFirestoreCollectionMutation(ref, {
    onSuccess: (_, variables) => {
      setInputMessage("");
      setSelectedImages([]);
      scrollToBottom();
      conversationMutation.mutate({
        timestamp: serverTimestamp(),
        lastMessage: {
          user: variables.userId,
          text: variables.message,
        },
        participants: [
          variables.userId,
          conversationId.replace(variables.userId, ""),
        ],
      });
    },
  });

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const openPickerButtonRef = useRef<HTMLButtonElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const [isRounded, setIsRounded] = useState(true);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent) => {
    const { target } = event;
    const { value } = target as HTMLInputElement;
    setInputMessage(value);

    const input = inputRef.current;
    if (!input) return;

    input.style.height = "auto";
    input.style.height = `${input.scrollHeight}px`;

    if (input.scrollHeight > 36) {
      setIsRounded(false);
    } else {
      setIsRounded(true);
    }
  };

  const handleEmojiClick = () => {
    setEmojiOpen((prevValue) => !prevValue);
  };

  function handleClickOutside(event: any) {
    if (!event) return;
    if (
      (openPickerButtonRef.current &&
        openPickerButtonRef.current.contains(event.target)) ||
      (pickerRef.current && pickerRef.current.contains(event.target))
    ) {
      return;
    }
    setEmojiOpen(false);
  }

  function handleEmojiSelect(value: any) {
    const { native } = value;
    setInputMessage((prevValue) => prevValue + native);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSendMessage(e: FormEvent) {
    e.preventDefault();

    if (
      inputMessage.split(" ").join("").length < 1 &&
      selectedImages.length < 1
    ) {
      setInputMessage("");
      return;
    }

    console.log(selectedImages);

    mutation.mutate({
      userId: currentUser?.uid,
      message: inputMessage,
      timestamp: serverTimestamp(),
      attachments: {
        type: "img",
        data: selectedImages,
      },
    });
  }

  const handleOnpaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (event.clipboardData) {
      const text = event.clipboardData.getData("text/html");
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      var image = doc.querySelector("img");

      if (image) {
        const src = image.src;
        setSelectedImages((prevValue) => [...prevValue, src]);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-end justify-end bg-transparent">
        <div ref={pickerRef} className="absolute">
          {emojiOpen ? (
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              theme="light"
              previewPosition="none"
              onClickOutside={handleClickOutside}
            />
          ) : null}
        </div>
      </div>
      <form
        onSubmit={handleSendMessage}
        className={`w-full h-full flex items-center bg-white shadow-md rounded-${
          isRounded ? "full" : "xl"
        } overflow-hidden`}
      >
        <div className="flex space-x-2 mx-4">
          <PlusCircleIcon className="conversation-send-icon" />
          <PhotoIcon className="conversation-send-icon" />
          <ClipboardDocumentIcon className="conversation-send-icon" />
        </div>
        <div className="flex-1">
          {selectedImages.length > 0 ? (
            <ImageLists images={selectedImages} />
          ) : null}
          <textarea
            autoFocus
            placeholder="Aa"
            className="resize-none bg-transparent border-none w-full text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none"
            ref={inputRef}
            rows={1}
            value={inputMessage}
            onChange={handleChange}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                handleSendMessage(event);
              }
            }}
            onPaste={(event: React.ClipboardEvent<HTMLTextAreaElement>) =>
              handleOnpaste(event)
            }
          />
        </div>

        <button
          ref={openPickerButtonRef}
          className="bg-gray-100 rounded-full p-1"
          onClick={handleEmojiClick}
        >
          <FaceSmileIcon className="text-gray-400 w-6 h-6" />
        </button>

        <button type="submit" className="py-3 px-4">
          <PaperAirplaneIcon className="text-primary w-6 h-6" />
        </button>
      </form>
    </div>
  );
}

export default SendInput;
