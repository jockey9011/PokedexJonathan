const getBackground = type => {
    switch (type) {
        case "normal":
            return "#BC6B7C"
        case "fighting":
            return "#E95B36"
        case "flying":
            return "rgb(72, 103, 123)"
        case "poison":
            return "#C48EF9"
        case "ground":
            return "#9C6614"
        case "rock":
            return "#7E7E7E"
        case "bug":
            return "#C3DEA3"
        case "ghost":
            return "#454AA8"
        case "steel":
            return "rgb(93, 115, 108)"
        case "fire":
            return "#E75C35"
        case "water":
            return "#1479FB"
        case "grass":
            return "#C3DEA3"
        case "electric":
            return "#2B319B"
        case "psychic":
            return "#D69638"
        case "ice":
            return "#64CBF5"
        case "dragon":
            return "rgb(68, 138, 148)"
        case "dark":
            return "#0D1211"
        case "fairy":
            return "#C23867"
        default:
            return "rgba(209, 18, 18, 0.745)"
    }
}
  
export default getBackground