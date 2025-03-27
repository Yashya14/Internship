import React from 'react'

interface LabelValueModel {
    labelname: string;
    value: string;
}

const LabelValueModel: React.FC<LabelValueModel> = ({ labelname, value }) => {
    return (
        <>
            <div className="max-w-sm mx-auto overflow-hidden">
                <div className="px-1 py-1 grid grid-cols-2 gap-2">
                    <label className="text-xl text-gray-800">{labelname} : </label>
                    <p className="text-gray-700 text-xl">
                        {value}
                    </p>
                </div>
            </div>
        </>
    )
}

export default LabelValueModel