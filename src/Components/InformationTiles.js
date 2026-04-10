
import "../css/InformationTiles.css";

const InformationTiles = (props) => {
  const { image, text, style } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
        minWidth: "70px",
        flexShrink: 0
      }}
    >
      <div className='tile'
        style={style}
      >
        {image ?
          <img
            src={image}
            alt="icon"
            style={{ height: "100%", width: "100%" }}
          /> : <></>
        }
      </div>
      {text}
    </div>
  )
}

export default InformationTiles
