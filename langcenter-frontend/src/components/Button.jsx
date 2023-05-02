


export default function Button(props)
{
    return(
        <button  
                 style={props.style} 
                 className={props.className} 
                 onClick={props.onlClick}
                 disabled={props.disabled}
        >
            {props.value}

        </button>
    )
}