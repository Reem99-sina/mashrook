interface imageInfo {
    id: number;
    name: string;
    link: string;
    createdAt: string;
    updatedAt: string;
    property_id: number;
  }
const EachImageComponent = ({ ele }:{ele:imageInfo}) => {
  return (
    <img
      key={ele?.id}
      src={ele.link}
      alt={ele.name}
      className="rounded-xl h-full w-full object-cover"
    />
  );
};

export default EachImageComponent;
