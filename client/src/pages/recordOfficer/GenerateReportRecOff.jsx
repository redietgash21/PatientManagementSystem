







import React, { Fragment, memo } from "react";
import ReactDOM from "react-dom";
import {Designer} from "@grapecity/activereports-react"
import { FontStore } from "@grapecity/activereports/core";

function GenerateReportRecOff() {
  const currentResolveFn = React.useRef();
  const counter = React.useRef(0);
  const [reportStorage, setReportStorage] = React.useState(new Map());

  function onSelectReport(reportId) {
    if (currentResolveFn.current) {
      window.$("#dlgOpen").modal("hide");
      currentResolveFn.current({
        definition: reportStorage.get(reportId),
        id: reportId,
        displayName: reportId,
      });
      currentResolveFn.current = null;
    }
  }
  function onCreateReport(){
    const CPLReport = {
      Name: "Report",
      Body: {
        Width: "8.5in",
        Height: "11in",
      },
    };     
    const reportId = `NewReport${++counter.current}`;
    return Promise.resolve({
      definition: CPLReport,
      id: reportId,
      displayName: reportId,
    });   
  }
  function onOpenReport(){
    return new Promise(function (resolve) {
      currentResolveFn.current = resolve;
      window.$("#dlgOpen").modal("show");
    });
  }
  function onSaveReport(info){
    const reportId = info.id || `NewReport${++counter.current}`;
    setReportStorage(new Map(reportStorage.set(reportId, info.definition)));
    return Promise.resolve({ displayName: reportId });    
  }
  function onSaveAsReport(info){
    const reportId = `NewReport${++counter.current}`;
    setReportStorage(new Map(reportStorage.set(reportId, info.definition)));
    return Promise.resolve({ id: reportId, displayName: reportId });    
  }
  return (
    <Fragment>
      <div id="designer-host" style={{backgroundColor:"blue"}}><Designer onCreate={onCreateReport} onSave={onSaveReport} onSaveAs={onSaveAsReport} onOpen={onOpenReport} /></div>
      <div class="modal" id="dlgOpen" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Open Report
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h2>Select Report:</h2>
              <div class="list-group">
                {[...reportStorage.keys()].map((reportId) => (
                  <button
                    type="button"
                    class="list-group-item list-group-item-action"
                    onClick={() => onSelectReport(reportId)}
                  >
                    {reportId}
                  </button>
                ))}
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default memo (GenerateReportRecOff);




