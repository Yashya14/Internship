import React, { useState } from 'react';
import RadioGroup from "./RadioGroup.tsx"

const Radio: React.FC = () => {
    const items: { value: string, label: string }[] = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' }
    ];

    const [value, setValue] = useState<string | null>(null);

    return (
        <>
            <RadioGroup
                name="gender"
                items={items}
                value={value}
                onChange={setValue}
            />
        </>
    );
}

export default Radio;

