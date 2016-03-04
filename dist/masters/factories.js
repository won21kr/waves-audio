// schedulers should be singletons
"use strict";

var _core = require("babel-runtime/core-js")["default"];

var _interopRequire = require("babel-runtime/helpers/interop-require")["default"];

var defaultAudioContext = _interopRequire(require("../core/audio-context"));

var Scheduler = _interopRequire(require("./scheduler"));

var SimpleScheduler = _interopRequire(require("./simple-scheduler"));

var schedulerMap = new _core.WeakMap();
var simpleSchedulerMap = new _core.WeakMap();

// scheduler factory
var getScheduler = function getScheduler() {
  var audioContext = arguments[0] === undefined ? defaultAudioContext : arguments[0];

  var scheduler = schedulerMap.get(audioContext);

  if (!scheduler) {
    scheduler = new Scheduler({ audioContext: audioContext });
    schedulerMap.set(audioContext, scheduler);
  }

  return scheduler;
};

var getSimpleScheduler = function getSimpleScheduler() {
  var audioContext = arguments[0] === undefined ? defaultAudioContext : arguments[0];

  var simpleScheduler = simpleSchedulerMap.get(audioContext);

  if (!simpleScheduler) {
    simpleScheduler = new SimpleScheduler({ audioContext: audioContext });
    simpleSchedulerMap.set(audioContext, simpleScheduler);
  }

  return simpleScheduler;
};

module.exports = { getScheduler: getScheduler, getSimpleScheduler: getSimpleScheduler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9tYXN0ZXJzL2ZhY3Rvcmllcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBQ08sbUJBQW1CLDJCQUFNLHVCQUF1Qjs7SUFDaEQsU0FBUywyQkFBTSxhQUFhOztJQUM1QixlQUFlLDJCQUFNLG9CQUFvQjs7QUFFaEQsSUFBTSxZQUFZLEdBQUcsVUFBSSxPQUFPLEVBQUUsQ0FBQztBQUNuQyxJQUFNLGtCQUFrQixHQUFHLFVBQUksT0FBTyxFQUFFLENBQUM7OztBQUd6QyxJQUFNLFlBQVksR0FBRyx3QkFBNkM7TUFBcEMsWUFBWSxnQ0FBRyxtQkFBbUI7O0FBQzlELE1BQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRS9DLE1BQUksQ0FBQyxTQUFTLEVBQUU7QUFDZCxhQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztBQUMxRCxnQkFBWSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7R0FDM0M7O0FBRUQsU0FBTyxTQUFTLENBQUM7Q0FDbEIsQ0FBQzs7QUFFRixJQUFNLGtCQUFrQixHQUFHLDhCQUE2QztNQUFwQyxZQUFZLGdDQUFHLG1CQUFtQjs7QUFDcEUsTUFBSSxlQUFlLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDOztBQUUzRCxNQUFJLENBQUMsZUFBZSxFQUFFO0FBQ3BCLG1CQUFlLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztBQUN0RSxzQkFBa0IsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0dBQ3ZEOztBQUVELFNBQU8sZUFBZSxDQUFDO0NBQ3hCLENBQUM7O2lCQUVhLEVBQUUsWUFBWSxFQUFaLFlBQVksRUFBRSxrQkFBa0IsRUFBbEIsa0JBQWtCLEVBQUUiLCJmaWxlIjoiZXM2L21hc3RlcnMvZmFjdG9yaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gc2NoZWR1bGVycyBzaG91bGQgYmUgc2luZ2xldG9uc1xuaW1wb3J0IGRlZmF1bHRBdWRpb0NvbnRleHQgZnJvbSAnLi4vY29yZS9hdWRpby1jb250ZXh0JztcbmltcG9ydCBTY2hlZHVsZXIgZnJvbSAnLi9zY2hlZHVsZXInO1xuaW1wb3J0IFNpbXBsZVNjaGVkdWxlciBmcm9tICcuL3NpbXBsZS1zY2hlZHVsZXInO1xuXG5jb25zdCBzY2hlZHVsZXJNYXAgPSBuZXcgV2Vha01hcCgpO1xuY29uc3Qgc2ltcGxlU2NoZWR1bGVyTWFwID0gbmV3IFdlYWtNYXAoKTtcblxuLy8gc2NoZWR1bGVyIGZhY3RvcnlcbmNvbnN0IGdldFNjaGVkdWxlciA9IGZ1bmN0aW9uKGF1ZGlvQ29udGV4dCA9IGRlZmF1bHRBdWRpb0NvbnRleHQpIHtcbiAgbGV0IHNjaGVkdWxlciA9IHNjaGVkdWxlck1hcC5nZXQoYXVkaW9Db250ZXh0KTtcblxuICBpZiAoIXNjaGVkdWxlcikge1xuICAgIHNjaGVkdWxlciA9IG5ldyBTY2hlZHVsZXIoeyBhdWRpb0NvbnRleHQ6IGF1ZGlvQ29udGV4dCB9KTtcbiAgICBzY2hlZHVsZXJNYXAuc2V0KGF1ZGlvQ29udGV4dCwgc2NoZWR1bGVyKTtcbiAgfVxuXG4gIHJldHVybiBzY2hlZHVsZXI7XG59O1xuXG5jb25zdCBnZXRTaW1wbGVTY2hlZHVsZXIgPSBmdW5jdGlvbihhdWRpb0NvbnRleHQgPSBkZWZhdWx0QXVkaW9Db250ZXh0KSB7XG4gIGxldCBzaW1wbGVTY2hlZHVsZXIgPSBzaW1wbGVTY2hlZHVsZXJNYXAuZ2V0KGF1ZGlvQ29udGV4dCk7XG5cbiAgaWYgKCFzaW1wbGVTY2hlZHVsZXIpIHtcbiAgICBzaW1wbGVTY2hlZHVsZXIgPSBuZXcgU2ltcGxlU2NoZWR1bGVyKHsgYXVkaW9Db250ZXh0OiBhdWRpb0NvbnRleHQgfSk7XG4gICAgc2ltcGxlU2NoZWR1bGVyTWFwLnNldChhdWRpb0NvbnRleHQsIHNpbXBsZVNjaGVkdWxlcik7XG4gIH1cblxuICByZXR1cm4gc2ltcGxlU2NoZWR1bGVyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgeyBnZXRTY2hlZHVsZXIsIGdldFNpbXBsZVNjaGVkdWxlciB9O1xuIl19