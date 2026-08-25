// src/shared/pages/ErrorPage.tsx
import { AlertOctagon } from "lucide-react";

export function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="rounded-full bg-red-50 p-4 mb-4">
        <AlertOctagon className="size-10 text-red-500" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Algo salió mal</h1>
      <p className="text-muted-foreground max-w-md">
        Ocurrió un error inesperado. Intenta recargar la página o volver al inicio desde el menú lateral.
      </p>
    </div>
  );
}