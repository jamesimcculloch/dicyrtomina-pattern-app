

import React, { useState } from "react";

const App = () => {
  const labels = [
    { name: "a1", top: "536px", left: "153px" },
    { name: "a2", top: "574px", left: "157px" },
    { name: "a3", top: "644px", left: "166px" },
    { name: "a4", top: "519px", left: "185px" },
    { name: "a5", top: "499px", left: "217px" },
    { name: "a6", top: "709px", left: "195px" },
    { name: "a7", top: "760px", left: "167px" },
    { name: "b1", left: "268px", top: "477px" },
    { name: "b2", left: "243px", top: "527px" },
    { name: "b3", left: "271px", top: "508px" },
    { name: "b4", left: "246px", top: "580px" },
    { name: "b5", left: "276px", top: "549px" },
    { name: "b6", left: "306px", top: "503px" },
    { name: "b7", left: "307px", top: "479px" },
    { name: "b8", left: "337px", top: "462px" },
    { name: "b9", left: "381px", top: "450px" },
    { name: "b10", left: "284px", top: "649px" },
    { name: "d0", left: "429px", top: "444px" },
    { name: "d1", left: "485px", top: "433px" },
    { name: "d2", left: "483px", top: "487px" },
    { name: "d3", left: "405px", top: "547px" },
    { name: "d4", left: "347px", top: "546px" },
    { name: "d5", left: "376px", top: "633px" },
    { name: "d6", left: "550px", top: "436px" },
    { name: "d7", left: "563px", top: "509px" },
    { name: "d8", left: "531px", top: "543px" },
    { name: "d9", left: "552px", top: "583px" },
    { name: "e1", left: "607px", top: "434px" },
    { name: "e2", left: "639px", top: "435px" },
    { name: "e3", left: "674px", top: "434px" },
    { name: "e4", left: "710px", top: "439px" },
    { name: "e5", left: "740px", top: "451px" },
    { name: "e6", left: "779px", top: "438px" },
    { name: "e7", left: "813px", top: "458px" },
    { name: "e8", left: "824px", top: "412px" },
    { name: "e9", left: "866px", top: "440px" },
    { name: "d10", left: "582px", top: "572px" },
    { name: "d11", left: "511px", top: "588px" },
    { name: "f1", left: "745px", top: "488px" },
    { name: "f2", left: "679px", top: "535px" },
    { name: "f3", left: "809px", top: "546px" },
    { name: "f4", left: "736px", top: "542px" },
    { name: "f5", left: "633px", top: "646px" },
    { name: "f6", left: "484px", top: "673px" },
    { name: "f7", left: "446px", top: "656px" },
    { name: "f8", left: "460px", top: "717px" },
    { name: "f9", left: "576px", top: "704px" },
    { name: "f10", left: "660px", top: "719px" },
    { name: "f11", left: "576px", top: "745px" },
    { name: "f12", left: "571px", top: "817px" },
    { name: "f13", left: "946px", top: "769px" },
    { name: "f14", left: "1047px", top: "723px" },
    { name: "f15", left: "760px", top: "631px" },
    { name: "f16", left: "541px", top: "646px" },
    { name: "f17", left: "581px", top: "658px" },
    { name: "c14", left: "366px", top: "817px" },
    { name: "c2", left: "289px", top: "695px" },
    { name: "c3", left: "292px", top: "724px" },
    { name: "c4", left: "337px", top: "691px" },
    { name: "c5", left: "334px", top: "652px" },
    { name: "c6", left: "447px", top: "837px" },
    { name: "c7", left: "524px", top: "893px" },
    { name: "c8", left: "498px", top: "908px" },
    { name: "c9", left: "513px", top: "926px" },
    { name: "c10", left: "552px", top: "932px" },
    { name: "c11", left: "464px", top: "781px" },
    { name: "c12", left: "425px", top: "748px" },
    { name: "c13", left: "395px", top: "763px" },
    { name: "c1", left: "479px", top: "743px" },
    { name: "c15", left: "403px", top: "683px" },
    { name: "c16", left: "494px", top: "840px" }
  ];

  const [selectedLabels, setSelectedLabels] = useState({});
  const [postPatch, setPostPatch] = useState("");
  const [flankPattern, setFlankPattern] = useState("");
  const [antennalGradient, setAntennalGradient] = useState("");
  const [metadata, setMetadata] = useState({ specimenCode: "", date: "", location: "", morphospecies: "", comment: "" });
  const [records, setRecords] = useState([]);

  const toggleLabel = (label) => {
    setSelectedLabels((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  

  const handleSaveSpecimen = () => {
    const selectedLabelsStr = Object.keys(selectedLabels)
      .filter((key) => selectedLabels[key])
      .join("; ");
  
    const newRecord = {
      specimenCode: metadata.specimenCode,
      date: metadata.date,
      location: metadata.location,
      morphospecies: metadata.morphospecies,
      comment: metadata.comment,
      selectedLabels: selectedLabelsStr,
      postPatch,
      flankPattern,
      antennalGradient,
    };
  
    setRecords((prevRecords) => [...prevRecords, newRecord]);
  
    // Clear fields for the next entry
    setMetadata({ specimenCode: "", date: "", location: "", morphospecies: "", comment: "" });
    setSelectedLabels({});
    setPostPatch("");
    setFlankPattern("");
    setAntennalGradient("");
  };

  const handleDownload = () => {
    if (records.length === 0) {
      alert("No specimens recorded! Please save at least one specimen.");
      return;
    }
  
    // Create CSV header with metadata fields + all labels as columns
    let csvContent = "Specimen Code,Date,Location,Morphospecies,Comment,Post. Patch,Flank Pattern,Antennal Gradient";
    
    // Append all labels as individual columns
    labels.forEach(label => {
      csvContent += `,${label.name}`;
    });
    
    csvContent += "\n";
  
    // Populate rows with data
    records.forEach((record) => {
      let row = `${record.specimenCode},${record.date},${record.location},${record.morphospecies},${record.comment},${record.postPatch},${record.flankPattern},${record.antennalGradient}`;
  
      // Append each label's value (1 if selected, 0 otherwise)
      labels.forEach(label => {
        row += `,${record.selectedLabels.includes(label.name) ? "1" : "0"}`;
      });
  
      csvContent += row + "\n";
    });
  
    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "specimen_data.csv";
    a.click();
  
    URL.revokeObjectURL(url);
  };
  

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">   <em className="italic">Dicyrtomina</em> pattern: rapid data entry</h1>

      {/* Metadata Fields */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-0">   Specimen metadata</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <input
            type="text"
            placeholder="specimen code"
            className="border rounded p-2"
            value={metadata.specimenCode}
            onChange={(e) => setMetadata({ ...metadata, specimenCode: e.target.value })}
          />
          <input
            type="date"
            className="border rounded p-2"
            value={metadata.date}
            onChange={(e) => setMetadata({ ...metadata, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="location"
            className="border rounded p-2"
            value={metadata.location}
            onChange={(e) => setMetadata({ ...metadata, location: e.target.value })}
          />
          <input
            type="text"
            placeholder="morphospecies"
            className="border rounded p-2"
            value={metadata.morphospecies}
            onChange={(e) => setMetadata({ ...metadata, morphospecies: e.target.value})}
          />  
          <input
            type="text"
            placeholder="comment"
            className="border rounded p-2"
            value={metadata.comment}
            onChange={(e) => setMetadata({ ...metadata, comment: e.target.value})}
          /> 
        </div>
      </div>

      {/* Pattern Selectors */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">   Pattern options</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block mb-1">Post. patch</label>
            <select
              className="border rounded p-2 w-full"
              value={postPatch}
              onChange={(e) => setPostPatch(e.target.value)}
            >
              <option value="">Select</option>
              <option value="pattern1">Pattern A</option>
              <option value="pattern2">Pattern B</option>
              <option value="pattern3">Pattern C</option>
              <option value="pattern3">Pattern D</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Flank pattern</label>
            <select
              className="border rounded p-2 w-full"
              value={flankPattern}
              onChange={(e) => setFlankPattern(e.target.value)}
            >
              <option value="">Select</option>
              <option value="patternA">Pattern A</option>
              <option value="patternB">Pattern B</option>
              <option value="patternC">Pattern C</option>
              <option value="patternD">Pattern D</option>
              <option value="patternD">Pattern E</option>
              <option value="patternD">Pattern F</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Antennal gradient</label>
            <select
              className="border rounded p-2 w-full"
              value={antennalGradient}
              onChange={(e) => setAntennalGradient(e.target.value)}
            >
              <option value="">Select</option>
              <option value="patternA">Pattern A</option>
              <option value="patternB">Pattern B</option>
              <option value="patternC">Pattern C</option>
            </select>
          </div>
        </div>
      </div>

      <button className="bg-blue-500 text-white p-2 rounded mr-2" onClick={handleSaveSpecimen}>
        Save specimen
      </button>

      {/* Download Button */}
      <button
        className="bg-green-500 text-white p-2 rounded"
        onClick={handleDownload}
      >
        Download data
      </button>

      {/* Background Image with Overlay Buttons */}
      <div className="relative mb-4" style={{ width: "1200px", height: "800px" }}>
        {/* Background Image */}
        <img
          src="Dicyrtomina_pattern_template4_blank.png"
          alt="Pattern Map"
          className="absolute top-0 left-0 w-full h-full"
          style={{ width: "100%", height: "auto" }}
        />

        {/* Label Buttons */}
        {labels.map((label) => (
          <button
            key={label.name}
            className={`absolute p-2 rounded-full ${
              selectedLabels[label.name] ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            style={{ position: 'absolute', top: label.top, left: label.left,
              backgroundColor: selectedLabels[label.name] ? 'black' : 'transparent', border:'none',
              color: selectedLabels[label.name] ? 'white' : 'black'
             }}
            onClick={() => toggleLabel(label.name)}
          >
            {label.name}
          </button>
        ))}
      </div>

    </div>
  );
};

export default App;


