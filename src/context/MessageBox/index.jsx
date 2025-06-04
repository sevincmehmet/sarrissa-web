import React, {
  createContext,
  useContext,
  useState,

} from "react";
import MessageBox from "../../component/MessageBox";

const MessageBoxContext = createContext(undefined);

export function MessageBoxProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [onConfirm, setOnConfirm] = useState(() => () => {});
  const [onCancel, setOnCancel] = useState(() => () => {});

  const openMessageBox = (
    title,
    content,
    confirm,
    cancel,
  ) => {
    setTitle(title);
    setContent(content);
    setOnConfirm(() => confirm);
    setOnCancel(() => cancel);
    setIsOpen(true);
  };

  const closeMessageBox = () => {
    setIsOpen(false);
  };

  return (
    <MessageBoxContext.Provider
      value={{
        openMessageBox,
        closeMessageBox,
        isOpen,
        title,
        content,
        onConfirm,
        onCancel,
      }}
    >
      {children}
      <MessageBox
        isOpen={isOpen}
        title={title}
        content={content}
        onConfirm={() => {
          onConfirm();
          closeMessageBox();
        }}
        onCancel={() => {
          onCancel();
          closeMessageBox();
        }}
      />
    </MessageBoxContext.Provider>
  );
}

export function useMessageBox() {
  const context = useContext(MessageBoxContext);
  if (!context) {
    throw new Error("useMessageBox must be used within MessageBoxProvider");
  }
  return context;
}
