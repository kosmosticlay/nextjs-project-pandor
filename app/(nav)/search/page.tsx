import FormInput from "@/components/form/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Search() {
  return (
    <div className="wrapper bg-blue-900">
      <h1 className="h1">검색하기</h1>
      <form className="w-2/3 flex">
        <select
          name="category"
          className="h-10 rounded-sm mr-1 border-2 px-2  bg-black"
        >
          <option value="1">작성자 검색</option>
          <option value="2">제목 검색</option>
          <option value="3">내용 검색</option>
          <option value="4">전체 검색</option>
        </select>
        <FormInput
          name="keyword"
          placeholder="검색어를 입력하세요."
          required
          type="text"
        />
        <button className="w-10 h-10 border-2 flex-shrink-0 rounded-sm ml-1 bg-black flex-center active:button-animation">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>
      </form>
    </div>
  );
}
