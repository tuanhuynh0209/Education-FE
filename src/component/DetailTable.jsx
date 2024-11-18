import React from 'react';

const DetailTable = ({ details, columns }) => {
    return (
        <div className="bg-gray-100 rounded-lg shadow-lg p-6">
            <table className="table-auto w-full text-left">
                <tbody>
                    {columns.map((column, index) => (
                        <tr key={index} className="py-2">
                            <td className="font-semibold text-gray-700 w-1/2 py-2">{column.label}</td>
                            <td className="text-gray-600 py-2">{details[column.key] || "Chưa cập nhật"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DetailTable;
