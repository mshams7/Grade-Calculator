import React, { useEffect, useState, useRef } from "react";
import { Element } from "./Element";
export const Grade = (props) => {
  console.log(props.cumulative_credit);

  //State define for the need.
  //state for courses rendering.
  const [course, setCourse] = useState(props.user);
  //state for grade for particular course.
  const [grade, setGrade] = useState({});
  //state for Semester Performance Index.
  const [spi, setSpi] = useState(null);
  //state for Cumulative Performance Index.
  const [cpi, setCpi] = useState(null);
  //state for current_semester total credit.
  const [sem_credit, setSem_credit] = useState(null);

  //getting the credit till last sem
  //converting the sememter to numberic form
  const sem = {
    first: 0,
    second: 1,
    third: 2,
    fourth: 3,
    fifth: 4,
    sixth: 5,
    seventh: 6,
    eighth: 7,
  };
  const curr_sem = sem[`${props.semester}`];
  const credit_till_last_sem = curr_sem
    ? props.cumulative_credit[curr_sem - 1]
    : null;

  //when ever we want to change user properties. we changes these parameters.
  useEffect(() => {
    setCourse(props.user);
    setGrade({});
    setSpi(null);
    setCpi(null);
  }, [props.user]);

  //logic for SPI calculation.
  const calculateSPI = () => {
    let ttl_credit = 0;
    let ttl_marks = 0;
    for (const key in grade) {
      if (grade[key] === "grade") {
        alert(`Enter A Valid grade for course  ${key}`);
        return;
      }
      const particular_course = course.find(
        (element) => element.course === key
      );
      ttl_credit = ttl_credit + particular_course.credit;
      ttl_marks = ttl_marks + particular_course.credit * grade[key];
    }
    let curr_spi = ttl_marks / ttl_credit;

    setSpi(curr_spi.toFixed(2));
    setSem_credit(ttl_credit);
  };

  const cpiRef = useRef(null);
  const calculateCPI = () => {
    let curr_cpi =
      (sem_credit * spi + cpiRef.current.value * credit_till_last_sem) /
      (sem_credit + credit_till_last_sem);
    setCpi(curr_cpi.toFixed(2));
  };

  return (
    <>
      <div className="container ">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Course</th>
              <th scope="col">Grade</th>
            </tr>
          </thead>
          <tbody>
            {course.map((element) => {
              return (
                <Element
                  key={element.course}
                  courseName={element.course}
                  setGrade={setGrade}
                  grade={grade}
                />
              );
            })}
          </tbody>
        </table>

        <button
          type="button"
          className="btn btn-outline-dark btn-lg"
          onClick={calculateSPI}
        >
          Calculate SPI
        </button>
      </div>
      <div className="container">
        {!credit_till_last_sem && spi && <h1>Your CPI is {spi}</h1>}
        {credit_till_last_sem && spi && <h1>Your SPI is {spi}</h1>}
      </div>
      <div className="container">
        {credit_till_last_sem && spi && (
          <form>
            <div className="form-row">
              <div className="col-md-3 mb-3">
                <input
                  ref={cpiRef}
                  type="number"
                  className="form-control"
                  placeholder="CPI till now."
                />
              </div>
            </div>
            <button
              type="button"
              className="btn btn-outline-dark btn-lg"
              onClick={calculateCPI}
            >
              Calculate CPI
            </button>
          </form>
        )}
      </div>
      {cpi && <div className="container">{<h1>Your CPI is {cpi}</h1>}</div>}
    </>
  );
};
