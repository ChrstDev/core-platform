import { Construction } from "lucide-react";

interface Props {
  modulo?: string;
}

export function EnConstruccionPage({ modulo }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="rounded-full bg-muted p-4 mb-4">
        <Construction className="size-10 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold mb-2">
        {modulo ? `${modulo} — En construcción` : "En construcción"}
      </h1>
      <p className="text-muted-foreground max-w-md">
        Estamos trabajando en esta sección. Vuelve pronto.
      </p>
    </div>
  );
}