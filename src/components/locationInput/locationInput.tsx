import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Label } from "@/components/ui/label"
import { FormError } from '../formError/formError';
import { Control, useForm } from 'react-hook-form';

type InputLocationProps = {
    label: string;
    errorMessage?: string;
    onSelectLocation: (location: string) => void;
    name: string;
}


export function LocationInput({ label, errorMessage, onSelectLocation }: InputLocationProps) {

    const handleChange = (value: any) => {
        const placeValue = value?.label || '';
        console.log("value is: " + placeValue);
        onSelectLocation(placeValue);
    }

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <FormError errorMessage={errorMessage}>
                <Label>{label}</Label>
                <GooglePlacesAutocomplete
                    selectProps={{
                        placeholder: 'Location',
                        onChange: handleChange,
                    }}
                    apiKey="AIzaSyBAaN9eVb8dOo9FLfTPwrDKAt4UlTezK68"
                />
            </FormError>
        </div>
    );
};
