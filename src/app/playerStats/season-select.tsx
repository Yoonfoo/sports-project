export default function SeasonSelect(){
    return (
        <div className="flex flex-col">
            <div>
                <label>Season</label>
            </div>
            <div>
                <select name="season">
                    <option value="2020-21">2024-25</option>
                    <option value="2020-21">2023-24</option>
                    <option value="2020-21">2022-23</option>
                    <option value="2020-21">2021-22</option>
                    <option value="2020-21">2020-21</option>
                    <option value="2019-20">2019-20</option>
                    <option value="2018-19">2018-19</option>
                    <option value="2017-18">2017-18</option>
                    <option value="2016-17">2016-17</option>
                    <option value="2015-16">2015-16</option>
                    <option value="2014-15">2014-15</option>
                </select>
            </div>
        </div>
    )
}