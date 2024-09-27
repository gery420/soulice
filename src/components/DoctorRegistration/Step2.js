import { useStepperContext } from "components/DoctorRegistration/contexts/StepperContext";
import React, { forwardRef, useImperativeHandle } from "react";

const Step2 = forwardRef((props, ref) => {
  const { userData, setUserData } = useStepperContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useImperativeHandle(ref, () => ({
    checkFields() {
      if (!userData.email) {
        return false;
      }
      if (!userData.phoneNumber) {
        return false;
      }
      if (!userData.category) {
        return false;
      }
      return true;
    },
  }));

  return (
    <div className="flex flex-col ">
      <div className="mt-5 w-full flex-1">
        <label className="h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Category
        </label>
        <div className="my-2 flex rounded-lg border border-gray-200 bg-white p-1 ">
          <select
            aria-label="Default select example required"
            onChange={handleChange}
            name="category"
          >
            <option
              value="Psychiatrists"
              selected={userData.category === "Psychiatrists" ? true : false}
            >
              Psychiatrists
            </option>
            <option
              value="Mental Health Professionals"
              selected={userData.category === "Mental Health Professionals" ? true : false}
            >
              Mental Health Professionals
            </option>
            <option
              value="Pyschologists"
              selected={userData.category === "Pyschologists" ? true : false}
            >
              Pyschologists
            </option>
          </select>
        </div>
      </div>
      {userData.category === "Mental Health Professionals" && (
        <div className="mt-5 w-full flex-1">
          <label className="h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            Specialization
          </label>
          <div className="my-2 flex rounded border border-gray-200 bg-white p-1 ">
            <select
              aria-label="Default select example required"
              name="specialization"
              onChange={handleChange}
            >
              <option>Select Specialization</option>
              <option
                value="Forensic Psychiatry"
                selected={
                  userData.specialization === "Forensic Psychiatry" ? true : false
                }
              >
                Forensic Psychiatry
              </option>
              <option
                value="Child and adolescent psychiatry"
                selected={
                  userData.specialization === "Child and adolescent psychiatry" ? true : false
                }
              >
                Child and adolescent psychiatry
              </option>
              <option
                value="Geriatric psychiatry"
                selected={userData.specialization === "Geriatric psychiatry" ? true : false}
              >
                Geriatric psychiatry
              </option>
              <option
                value="Social Worker"
                selected={userData.specialization === "Social Worker" ? true : false}
              >
                Social Worker
              </option>
              <option
                value="Licensed Professional Counselor"
                selected={
                  userData.specialization === "Licensed Professional Counselor" ? true : false
                }
              >
                Licensed Professional Counselor
              </option>
            </select>
          </div>
        </div>
      )}

      <div className="mt-3 w-full flex-1">
        <label className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Email
        </label>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["email"] || ""}
            name="email"
            placeholder="email"
            type="email"
            required
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="mt-3 w-full flex-1">
        <label className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Phone No.
        </label>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["phoneNumber"] || ""}
            name="phoneNumber"
            placeholder="Phone No."
            type="text"
            pattern="[0-9]*"
            required
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
    </div>
  );
});

export default Step2;
