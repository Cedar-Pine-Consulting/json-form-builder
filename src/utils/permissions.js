import { roles } from "./constants";

export const userCanReadCase = (user, _case) => {
  /**
   * @param {user} user object of the person making the request
   * @param {case} case object that REQUIRES case.program(.id) and case.program.departmentId to work
   * @returns boolean
   */
  if (!user || !_case) {
    return false;
  }

  if (user.authRole.name === roles.SUPERUSER) {
    return true;
  }

  // Immediately check and return if the case is non-sensitive and under the user's department.
  if (
    _case.program
      ? _case.program.departmentId === user.staff.departmentId &&
        !_case.program.isSensitive
      : _case.service?.departmentId === user.staff.departmentId
  ) {
    return true;
  }

  if (user.authRole.name === roles.CASE_MANAGER) {
    return (
      // CASE_MANAGER can view cases they manage
      _case.managerId === user.staff.id ||
      // CASE_MANAGER can view cases in programs they're assigned to
      user.staff.programsAssigned.some((p) => p.id === _case.program?.id) ||
      // CASE_MANAGER can view cases that are not sensitive and in their department
      (_case.service?.departmentId === user.staff.departmentId &&
        !_case.program?.isSensitive)
    );
  }

  if (user.authRole.name === roles.PROGRAM_MANAGER) {
    return (
      // PROGRAM_MANAGER can view cases they manage
      _case.managerId === user.staff.id ||
      // PROGRAM_MANAGER can view cases if they are the manager of the program
      _case.program?.managerId === user.staff.id ||
      // PROGRAM_MANAGER can view cases in programs they're assigned to
      user.staff.programsAssigned.some((p) => p.id === _case.program?.id) ||
      // PROGRAM_MANAGER can view all non-sensitive cases in their department
      (_case.service?.departmentId === user.staff.departmentId &&
        !_case.program?.isSensitive)
    );
  }

  return false;
};

export const userCanEditCase = (user, _case) => {
  /**
   * @param {user} user object of the person making the request
   * @param {case} case object that REQUIRES case.program(.id) and case.program.departmentId to work
   * @returns boolean
   */
  if (!user || !_case) {
    return false;
  }
  if (user.authRole.name === roles.SUPERUSER) {
    return true;
  }

  if (user.authRole.name === roles.CASE_MANAGER) {
    return (
      // CASE_MANAGER can edit cases they manage
      _case.managerId === user.staff.id
    );
  }

  if (user.authRole.name === roles.PROGRAM_MANAGER) {
    return (
      // PROGRAM_MANAGER can edit cases they directly manage
      _case.managerId === user.staff.id ||
      // PROGRAM_MANAGER can edit any cases in a program they directly manage
      _case.program?.managerId === user.staff.id ||
      // PROGRAM_MANAGER can edit any cases in a program they are assigned to
      user.staff.programsAssigned.some((p) => p.id === _case.program?.id) ||
      // PROGRAM_MANAGER can edit all non-sensitive cases in their department
      (_case.service?.departmentId === user.staff.departmentId &&
        !_case.program?.isSensitive)
    );
  }

  return false;
};

export const userCanEditProgram = (user, program) => {
  /**
   * @param {user} user object of the person making the request
   * @param {program} program object that REQUIRES program.managerId to work
   * @returns boolean
   */
  if (!user || !program) {
    return false;
  }
  if (user.authRole.name === roles.SUPERUSER) {
    return true;
  }

  if (user.authRole.name === roles.PROGRAM_MANAGER) {
    return (
      // PROGRAM_MANAGER can edit programs they manage
      program.managerId === user.staff.id ||
      // PROGRAM_MANAGER can edit programs they are assigned to
      user.staff.programsAssigned.some((p) => p.id === program.id)
    );
  }

  return false;
};
