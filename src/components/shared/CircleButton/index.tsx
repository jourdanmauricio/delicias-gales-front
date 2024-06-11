type props = {
  className: string;
  children: React.ReactNode;
}
const CircleButton = (props: props) => {
  return (
    <div className={props.className}>{props.children}</div>
  )
}
export default CircleButton

