import EditProfile from "../components/ProfileCompo/EditProfile"
import AvatarEdit from "../components/ProfileCompo/AvatarEdit"
export default function Settings() {
    return (
        <div>
            <h1>Parametres Page </h1>
            <span className="FormContainer">
                <EditProfile />
                <AvatarEdit />
                <br />
                <button type="submit">Save Changes</button>
            </span>
        </div>
    )
}