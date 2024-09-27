import React, { createContext, ReactNode, FC, useState } from 'react';
interface AllDataContextType {
    pageCount: number
    setPageCount: React.Dispatch<React.SetStateAction<number>>
    catID: number
    setcatID: React.Dispatch<React.SetStateAction<number>>
}
const ALLDATA = createContext<AllDataContextType | undefined>(undefined);
interface AllDataProps {
    children: ReactNode;
}


const AllData: FC<AllDataProps> = ({ children }) => {
    const [pageCount, setPageCount] = useState<number>(1);
    const [catID, setcatID] = useState<number>(1);

    return <ALLDATA.Provider value={{ pageCount, setPageCount, catID, setcatID }}>{children} </ALLDATA.Provider>;
};

export default AllData;
export { ALLDATA };
