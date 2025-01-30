declare module "react-copy-to-clipboard" {
  import React from "react";

  export interface CopyButtonProps {
    text: string;
    buttonLabel?: string;
  }

  export const CopyButton: React.FC<CopyButtonProps> = ({
    text,
    buttonLabel = "Copy",
  }) => {
    const [copied, setCopied] = useState(false);
  };
  export interface CopyToClipboardProps {
    text: String;
    onCopy: () => void;
    children: React.ReactNode;
  }

  export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
    text,
    onCopy,
    children,
  }) => {
    return {children};
  };

  // export const CopyToClipboard : React.ReactNode<CopyToClipboardProps> = ({})
}
