// Reducer to manage the state of the Signup Component using the Hook useReducer
export const initialState = {
    signUp: false,
    userJSON: {},
    passCorrect: false,
    passStyleClasses: 'form-control',
    passStyleClassMsg: 'form-text',
    passStyleBorder: '1px solid #ced4da',
    rePassStyleClasses: 'form-control',
    rePassStyleClassMsg: 'form-text',
    rePassStyleBorder: '1px solid #ced4da'
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PASS_CORRECT':
            return {
                ...state, passCorrect: true
            }

        case 'SET_PASS_INCORRECT':
            return {
                ...state, passCorrect: false
            }

        case 'SET_USERJSON':
            return {
                ...state, signUp: true, userJSON: action.payload
            }

        case 'SET_PASS_STYLE':
            return {
                ...state,
                passStyleClasses: 'form-control',
                passStyleClassMsg: 'form-text',
                passStyleBorder: '1px solid #ced4da'
            }

        case 'SET_PASS_STYLE_DANGER':
            return {
                ...state,
                passStyleClasses: 'form-control text-danger',
                passStyleClassMsg: 'form-text text-danger',
                passStyleBorder: '1px solid red'
            }

        case 'SET_RE_PASS_STYLE_DANGER':
            return {
                ...state,
                rePassStyleClasses: 'form-control text-danger',
                rePassStyleClassMsg: 'form-text text-danger',
                rePassStyleBorder: '1px solid red'
            }

        case 'SET_PASS_STYLE_CORRECT':
            return {
                ...state,
                passCorrect: true,
                passStyleClasses: 'form-control text-success',
                passStyleClassMsg: 'form-text text-success',
                passStyleBorder: '1px solid #ced4da'
            }

        case 'SET_PASS_STYLE_INCORRECT':
            return {
                ...state,
                passCorrect: false,
                passStyleClasses: 'form-control text-danger',
                passStyleClassMsg: 'form-text text-danger',
                passStyleBorder: '1px solid #ced4da'
            }

        case 'SET_RE_PASS_STYLE':
            return {
                ...state,
                rePassStyleClasses: 'form-control',
                rePassStyleClassMsg: 'form-text',
                rePassStyleBorder: '1px solid #ced4da'
            }

        case 'SET_RE_PASS_STYLE_CORRECT':
            return {
                ...state,
                rePassStyleClasses: 'form-control text-success',
                rePassStyleClassMsg: 'form-text text-success',
                rePassStyleBorder: '1px solid #ced4da'
            }

        case 'SET_RE_PASS_STYLE_INCORRECT':
            return {
                ...state,
                rePassStyleClasses: 'form-control text-danger',
                rePassStyleClassMsg: 'form-text text-danger',
                rePassStyleBorder: '1px solid #ced4da'
            }

        default:
            return { initialState }
    }
}
