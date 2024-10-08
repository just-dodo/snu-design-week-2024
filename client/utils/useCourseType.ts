import { useRouter } from "next/router";
import courseList from "wordings/course";


export default function useCourseType() {

    // check query courseName
    const router = useRouter();
    const { courseName } = router.query;
    // check course that has same path with courseName
    const course = courseList.find((course) => course.path === courseName);
    // if course is not found, return null
    if (!course) return null;

    return course.type;

}