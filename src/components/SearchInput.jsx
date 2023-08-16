
import './styles/SearchInput.css';

function SearchInput({placeHolder, value, onChange, onSearch}) {
  return (
    <div id="cover">
        <form method="get" onSubmit={onSearch}>
            <div className="tb">
            <div className="td"><input type="text" placeholder={placeHolder} value={value} onChange={onChange}/></div>
            <div className="td" id="s-cover">
                <button type="submit">
                <div id="s-circle"></div>
                <span></span>
                </button>
            </div>
            </div>
        </form>
    </div>
  );
}

export default SearchInput;