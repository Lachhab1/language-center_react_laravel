import Button from 'react-bootstrap/Button';


const ButtonCustom = ({value,isDisabled,variant,size,className,handleSmthg}) => {
    return(
        <>
        <Button onClick={handleSmthg} className={className} variant={variant} size={size} disabled={isDisabled} >
            {value}
        </Button>
        </>
    )
}
export default ButtonCustom;