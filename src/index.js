/* written in ECMAscript 6 */
/**
 * @fileoverview WAVE audio time engine base class
 * @author Norbert.Schnell@ircam.fr, Victor.Saiz@ircam.fr, Karim.Barkati@ircam.fr
 */
"use strict";

var audioContext = require("audio-context");

class TimeEngine {
  constructor() {
    /**
     * Master (scheduler, transport, player) to which the time engine is synchronized
     * @type {Object}
     */
    this.master = null;

    /**
     * Interface used by the current master
     * @type {String}
     */
    this.interface = null;

    /**
     * Transport start position of the engine (handled by )
     * @type {Object}
     */
    this.transportStartPosition = 0;

    /**
     * Output audio node
     * @type {Object}
     */
    this.outputNode = null;
  }

  /**
   * Get the time engine's current master time
   * @type {Function}
   *
   * This function provided by the master.
   */
  get currentTime() {
    return audioContext.currentTime;
  }

  /**
   * Get the time engine's current master position
   * @type {Function}
   *
   * This function provided by the master.
   */
  get currentPosition() {
    return 0;
  };

  /**
   * Advance engine time (scheduled interface)
   * @param {Number} time current scheduler time (based on audio time)
   * @return {Number} next engine time
   *
   * This function is called by the scheduler to let the engine do its work
   * synchronized to the scheduler time.
   * If the engine returns Infinity, it is not called again until it is restarted by
   * the scheduler or it calls resetNextPosition with a valid position.
   */
  // advanceTime(time) {
  //   return time;
  // }

  /**
   * Function provided by the scheduler to reset the engine's next time
   * @param {Number} time new engine time (immediately if not specified)
   */
  resetNextTime(time = null) {}

  /**
   * Synchronize engine to transport position (transported interface)
   * @param {Number} position current transport position to synchronize to
   * @param {Number} time current scheduler time (based on audio time)
   * @param {Number} speed current speed
   * @return {Number} next position (given the playing direction)
   *
   * This function is called by the msater and allows the engine for synchronizing
   * (seeking) to the current transport position and to return its next position.
   * If the engine returns Infinity or -Infinity, it is not called again until it is
   * resynchronized by the transport or it calls resetNextPosition.
   */
  // syncPosition(time, position, speed) {
  //   return position;
  // }

  /**
   * Advance engine position (transported interface)
   * @param {Number} time current scheduler time (based on audio time)
   * @param {Number} position current transport position
   * @param {Number} speed current speed
   * @return {Number} next engine position (given the playing direction)
   *
   * This function is called by the transport to let the engine do its work
   * aligned to the transport's position.
   * If the engine returns Infinity or -Infinity, it is not called again until it is
   * resynchronized by the transport or it calls resetNextPosition.
   */
  // advancePosition(time, position, speed) {
  //   return position;
  // }

  /**
   * Function provided by the transport to reset the next position or to request resynchronizing the engine's position
   * @param {Number} position new engine position (will call syncPosition with the current position if not specified)
   */
  resetNextPosition(position = null) {};

  /**
   * Set engine speed (speed-controlled interface)
   * @param {Number} time current scheduler time (based on audio time)
   * @param {Number} position current transport position
   * @param {Number} speed current transport speed
   *
   * This function is called by the transport to propagate the transport speed to the engine.
   * The speed can be of any bewteen -16 and 16.
   * With a speed of 0 the engine is halted.
   */
  // syncSpeed(time, position, speed) {
  // }

  __setGetters(getCurrentTime, getCurrentPosition) {
    if (getCurrentTime) {
      Object.defineProperty(this, 'currentTime', {
        configurable: true,
        get: getCurrentTime,
        set: function(time) {}
      });
    }

    if (getCurrentPosition) {
      Object.defineProperty(this, 'currentPosition', {
        configurable: true,
        get: getCurrentPosition,
        set: function(position) {}
      });
    }
  }

  __deleteGetters() {
    delete this.currentTime;
    delete this.currentPosition;
  }

  setScheduled(scheduler, resetNextTime, getCurrentTime, getCurrentPosition) {
    this.master = scheduler;
    this.interface = "scheduled";

    this.__setGetters(getCurrentTime, getCurrentPosition);

    if (resetNextTime)
      this.resetNextTime = resetNextTime;
  }

  resetScheduled() {
    this.__deleteGetters();

    delete this.resetNextTime;

    this.master = null;
    this.interface = null;
  }

  setTransported(transport, startPosition, resetNextPosition, getCurrentTime, getCurrentPosition) {
    this.master = transport;
    this.interface = "transported";

    this.transportStartPosition = startPosition;

    this.__setGetters(getCurrentTime, getCurrentPosition);

    if (resetNextPosition)
      this.resetNextPosition = resetNextPosition;
  }

  resetTransported() {
    this.__deleteGetters();

    delete this.resetNextPosition;

    this.transportStartPosition = 0;
    this.master = null;
    this.interface = null;
  }

  setSpeedControlled(master, getCurrentTime, getCurrentPosition) {
    this.master = master;
    this.interface = "speed-controlled";

    this.__setGetters(getCurrentTime, getCurrentPosition);
  }

  resetSpeedControlled() {
    this.__deleteGetters();

    this.master = null;
    this.interface = null;
  }

  /**
   * Remove engine from current master
   */
  removeFromMaster() {
    if (this.master)
      this.master.remove(this);
  }

  /**
   * Connect audio node
   * @param {Object} target audio node
   */
  connect(target) {
    this.outputNode.connect(target);
    return this;
  }

  /**
   * Disconnect audio node
   * @param {Number} connection connection to be disconnected
   */
  disconnect(connection) {
    this.outputNode.disconnect(connection);
    return this;
  }
}

/**
 * Check whether the time engine implements the scheduled interface
 **/
TimeEngine.implementsScheduled = function(engine) {
  return (engine.advanceTime && engine.advanceTime instanceof Function);
}

/**
 * Check whether the time engine implements the transported interface
 **/
TimeEngine.implementsTransported = function(engine) {
  return (
    engine.syncPosition && engine.syncPosition instanceof Function &&
    engine.advancePosition && engine.advancePosition instanceof Function
  );
}

/**
 * Check whether the time engine implements the speed-controlled interface
 **/
TimeEngine.implementsSpeedControlled = function(engine) {
  return (engine.syncSpeed && engine.syncSpeed instanceof Function);
}

module.exports = TimeEngine;