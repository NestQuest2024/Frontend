import {InputWithLabel} from "@/components/ui/input-with-label";
import {Control} from "react-hook-form";
import {FormError} from "@/components/formError/formError";

type Props = {
    name: string;
    control: Control<any, any>;
    errorMessage: string | undefined;
    label: string;
    type: string;
};

export function FormInput ({ control, name, errorMessage, label, type }: Props) : React.ReactElement {
    return (
        <FormError errorMessage={errorMessage}>
            <InputWithLabel
                label={label}
                control={control}
                name={name}
                type= {type}
            />
        </FormError>
    );
}