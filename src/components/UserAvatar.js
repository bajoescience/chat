import { Avatar } from "@mui/material"

const UserAvatar = ({person}) => {

    const stringToColor = (person) => {
        const string = `${person.firstName} ${person.lastName}`
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }

      const initials = (person) => {
        const string = `${person.firstName} ${person.lastName}`
        let initial = ''
        for (let i = 0; i < string.length; i += 1) {
            if (i === 0) {
               initial = initial.concat(string[i].toUpperCase())
            } else if (string[i] === ' ' && string[i + 1] !== ' ' ) {
                initial = initial.concat(string[i + 1].toUpperCase())
            }
        }
        return initial
      }

    if (person.avatar) {
        return (
            <>
                <Avatar  alt={person.firstName} src={person.img} />
            </>
        )
    }
    return (
        <>
            <Avatar 
            sx={{
                backgroundColor: person.backgroundColor || stringToColor(person)}} 
                children={initials(person)} 
            />
        </>
    )
}

export default UserAvatar