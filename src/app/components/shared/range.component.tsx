import { Range, getTrackBackground } from "react-range";
interface propsRange{
    title:string, 
    firstNumDes:string,
    secondNumDes:string,
    step:number,
    min:number,
    max:number,
    values:number[],
    handleShareRangeChange:any,
    unit:string
}

const RangeComponent:React.FC<propsRange>=({title, firstNumDes,secondNumDes,step,min,max,values,handleShareRangeChange,unit})=>{
  return (
        <>
                  <div className="flex items-center justify-end">
                    <p className="text-base font-bold text-[#4B5563]">{title} </p>
                  </div>
                  <div className="mb-4" style={{ direction: "rtl" }}>
                    <div className="flex flex-col">
                      <div className="flex justify-between mb-2 text-sm text-gray-500 w-full p-4">
                        <span>{unit} {firstNumDes} </span>
                        <span>{unit} {secondNumDes}  </span>
                      </div>
                      <Range
                        step={step}
                        min={min}
                        max={max}
                        values={values}
                        onChange={handleShareRangeChange}
                        rtl
                        renderTrack={({ props, children }) => (
                          <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                              ...props.style,
                              height: "36px",
                              display: "flex",
                              width: "100%",
                            }}
                          >
                            <div
                              ref={props.ref}
                              style={{
                                height: "5px",
                                width: "100%",
                                borderRadius: "4px",
                                background: getTrackBackground({
                                  values: values,
                                  colors: ["#ccc", "#548BF4", "#ccc"],
                                  min: min,
                                  max: max,
                                  rtl: true,
                                }),
                                alignSelf: "center",
                              }}
                            >
                              {children}
                            </div>
                          </div>
                        )}
                        renderThumb={({ index, props }) => (
                          <div
                            {...props}
                            style={{
                              ...props.style,
                              height: "20px",
                              width: "20px",
                              borderRadius: "50%",
                              backgroundColor: "#548BF4",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              boxShadow: "0px 2px 6px #AAA",
                            }}
                            key={index}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: "-28px",
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: "12px",
                                fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                                padding: "4px",
                                borderRadius: "4px",
                                backgroundColor: "#548BF4",
                              }}
                            >
                              {unit}{values[index]}
                            </div>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </>
    )
}
export default RangeComponent