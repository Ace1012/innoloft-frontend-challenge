import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { IProduct, ITrl } from "../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { editProduct } from "../store/store";

interface EditDetailsProviderProps {
    children: React.ReactNode | React.ReactNode[]
}

interface TEditDetailsContext {
    editedProduct: EditedProduct;
    editedProductDispatch: React.Dispatch<IEditDetailsReducerAction>;
    saveProductEdits(): void;
    reset(): void;
};

type EditedProduct = Pick<IProduct, "name" | "description" | "video" | "categories" | "businessModels" | "trl" | "investmentEffort">;

type EditedProductPayload = Omit<EditedProduct, "categories" | "businessModels"> & {
    categories: string;
    businessModels: string;
}

export type EditedProductKey = keyof EditedProduct;

type EditedDetailsReducerActionType = EditedProductKey | "reset" | "delete";

interface IEditDetailsReducerAction {
    payload: Partial<EditedProductPayload>
    type: EditedDetailsReducerActionType
}

const initialState: EditedProduct = {
    name: "",
    description: "",
    video: "",
    categories: [],
    businessModels: [],
    trl: {
        id: 0,
        name: ""
    },
    investmentEffort: "",
}

function reducer(state: EditedProduct, { payload, type }: IEditDetailsReducerAction): EditedProduct {
    const key = Object.keys(payload)[0] as keyof EditedProductPayload;
    console.log(`${type} | `, payload);
    switch (type) {
        case "reset":
            return initialState;
        case "delete":
            return deleteItem(state, { payload, type });
        case "name":
        case "description":
        case "video":
        case "trl":
        case "investmentEffort":
            return {
                ...state,
                [type]: payload[key]
            };
        case "businessModels":
        case "categories":
            const val = payload[type]!;
            const hasVal = state[type].find(({ name }) => name === val);

            const newItem = {
                id: Date.now(),
                name: payload[type]
            }

            return hasVal
                ? state
                : {
                    ...state,
                    [type]: [
                        ...state[type],
                        newItem
                    ]
                }
        default:
            return state;
    }
}

/**
 * Delete item from editedProduct
 * @param state 
 * @param param1 
 * @returns 
 */
function deleteItem(state: EditedProduct, { payload }: IEditDetailsReducerAction): EditedProduct {
    const key = Object.keys(payload)[0] as keyof typeof payload;

    /**
     * Only the following 3 are deletable, the others are only editable
     * since they cannot be empty.
     */
    const isDeletable = key === "categories" || key === "businessModels" || key === "investmentEffort";

    if (!isDeletable) return state;

    const stateVal = state[key];
    const val = payload[key]!;
    const isArray = stateVal instanceof Array;

    const hasVal = isArray
        ? stateVal.find(({ name }) => {
            console.log(name)
            return name === val;
        })
        : stateVal === val;

    return hasVal
        ? {
            ...state,
            [key]: isArray
                ? stateVal.filter(({ name }) => name !== val)
                : ""
        }
        : state;
}

const EditDetailsContext = createContext<TEditDetailsContext>({} as TEditDetailsContext);

const EditDetailsProvider = ({ children }: EditDetailsProviderProps) => {
    const dispatch = useDispatch();
    const [editedProduct, editedProductDispatch] = useReducer(reducer, initialState);

    function reset() {
        editedProductDispatch({
            type: "reset",
            payload: {}
        })
    }

    function isChanged(val: string | ITrl | any[]) {
        return val instanceof Array
            ? val.length > 0
            : typeof val === "string"
                ? Boolean(val)
                : Boolean(val.name)
    }

    const saveProductEdits = useCallback(() => {
        const keys = Object.keys(editedProduct) as (keyof EditedProduct)[];

        // Remove any unchanged properties
        for (const key of keys) {
            const val = editedProduct[key];

            if (!isChanged(val)) {
                delete editedProduct[key];
            }
        }

        dispatch(editProduct(editedProduct));
        reset();
    }, [editedProduct])

    useEffect(() => {
        console.log("EditProductContext value: ", editedProduct);
    }, [editedProduct]);

    return (
        <EditDetailsContext.Provider value={{ editedProduct, editedProductDispatch, saveProductEdits, reset }}>
            {children}
        </EditDetailsContext.Provider>
    )
}

function useEditDetailsContext() {
    const context = useContext(EditDetailsContext);

    if (!context) {
        throw new Error("Must be used within an EditDetailsProvider");
    }

    return context;
}

export { useEditDetailsContext, EditDetailsProvider }