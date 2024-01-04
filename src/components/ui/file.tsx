import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormError } from "../formError/formError";

type InputFileProps = {
  control: any;
  name: string;
  errorMessage?: string;
  handleSelectedFile: (files: any) => void;
};

export function InputFile({ control, name, errorMessage, handleSelectedFile }: InputFileProps) {
  const allowedFormats = 'image/jpg, image/jpeg, image/png, image/gif, image/svg+xml, image/webp';

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <FormError errorMessage={errorMessage}>
        <Label htmlFor={name}>Picture</Label>
        <Input lang="en"
          id="picture"
          type="file"
          accept= {allowedFormats}
          {...control.register(name, { value: null })}
          onChange={(files) => handleSelectedFile(files.target.files)}
        />
      </FormError>
    </div>
  );
}
