"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  variant = "primary",
  confirmButtonClassName,
  cancelButtonClassName,
}: ConfirmationModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative bg-background border border-border rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {variant === "secondary" && (
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
            )}
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={isLoading}
            className="h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>

        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
            className={cancelButtonClassName}
          >
            {cancelText}
          </Button>
          <Button
            variant="ghost"
            onClick={onConfirm}
            disabled={isLoading}
            className={`min-w-[100px] ${confirmButtonClassName || ""}`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              confirmText
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
