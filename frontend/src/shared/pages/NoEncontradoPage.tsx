// src/shared/pages/NoEncontradoPage.tsx
import { FileQuestion } from "lucide-react";
import { Link } from "react-router-dom";

export function NoEncontradoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-slate-50">
      <FileQuestion className="size-16 text-muted-foreground mb-4" />
      <h1 className="text-6xl font-bold mb-2">404</h1>
      <p className="text-muted-foreground mb-6">
        La página que buscas no existe.
      </p>
      <Link
        to="/login"
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90"
      >
        Volver al inicio
      </Link>
    </div>
  );
}