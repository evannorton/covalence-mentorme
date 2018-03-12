import * as RestServices from '../services/rest';


async function getMentorSubjectsBySubject(subjectid) {
    return await RestServices.get(`/api/mentorSubjects/subjects/${subjectid}`);
}

export { getMentorSubjectsBySubject };