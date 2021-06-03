import {apiHootAction} from './lookup'

export function ActionBtn(props){
    const {hoot, action, didAction} = props
    const likes = hoot.likes ? hoot.likes : 0
    const className = props.className ? props.className : 'btn btn-primary btn-small'
    const actionDisplay = action.display ? action.display : 'Action'
    
    const handleClick = (event) => {
      event.preventDefault()
      apiHootAction(hoot.id, action.type, handleAction)
    }

    const handleAction = (response, status) => {
      console.log(response, status)
      if ((status === 200 || status === 201) && didAction) {
        didAction(response, status)
      }
    }

    const display = action.type === "like" ? `${likes} ${actionDisplay}` : actionDisplay
    return <button className={className} onClick={handleClick}>{display}</button>
}