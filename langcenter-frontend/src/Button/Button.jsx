


export default function Button(props)
{
    return(
        <button  
                 style={props.style} 
                 className={props.className} 
                 onClick={props.onClick}
                 disabled={props.disabled}
        >
            {props.value}

        </button>
    )
}