import DistributionPaginator from "./components/DistributionPaginator";
import MeanPerYearPaginator from "./components/MeanPerYearPaginator";
import VerticalSpacer from "./components/VerticalSpacer";
import SampleResultsPaginator from "./components/ResultGraphPaginator";


function FeaturesTable(){
   return(
    <div>
        <table style={{textAlign:'left'}}>
            <thead>
                <td></td>
                <td>Danceability</td>
                <td>Energy</td>
                <td>Loudness</td>
                <td>Valence</td>
                <td>Tempo</td>
                <td>Acousticness</td>
            </thead>
            <tbody>
                <tr>
                    <td>Mean</td>
                    <td>0.540939</td>
                    <td>0.591070</td>
                    <td>-10.166142</td>
                    <td>0.515204</td>
                    <td>121.336214</td>
                    <td>0.316986</td>
                </tr>
                <tr>
                    <td>Standard Deviation</td>
                    <td>0.151960</td>
                    <td>0.258203</td>
                    <td>4.126904</td>
                    <td>0.247071</td>
                    <td>29.497190</td>
                    <td>0.316747</td>
                </tr>
                <tr>
                    <td>Minimum</td>
                    <td>0.065700</td>
                    <td>0.019200</td>
                    <td>-25.189000</td>
                    <td>0.030500</td>
                    <td>49.179000</td>
                    <td>0.000003</td>
                </tr>
                <tr>
                    <td>25% Percentile</td>
                    <td>0.436000</td>
                    <td>0.390000</td>
                    <td>-12.624000	</td>
                    <td>0.313750</td>
                    <td>98.366750</td>
                    <td>0.023375</td>
                </tr>
                <tr>
                    <td>50% Percentile</td>
                    <td>0.545000</td>
                    <td>0.613000</td>
                    <td>-9.592500</td>
                    <td>0.535000</td>
                    <td>120.049000</td>
                    <td>0.203500</td>
                </tr>
                <tr>
                    <td>75% Percentile</td>
                    <td>0.653250</td>
                    <td>0.814250</td>
                    <td>6.750000</td>
                    <td>0.701500</td>
                    <td>139.754000</td>
                    <td>0.562750</td>
                </tr>
                <tr>
                    <td>Maximum</td>
                    <td>0.909000</td>
                    <td>0.996000</td>
                    <td>-2.584000</td>
                    <td>0.974000</td>
                    <td>207.329000</td>
                    <td>0.983000</td>
                </tr>
            </tbody>
        </table>
    </div>)
}

function ResultsTable(){
    return(
        <div>
            <table>
                <thead>
                    <td></td>
                    <td>Group 1</td>
                    <td>Group 2</td>
                    <td>Group 3</td>
                    <td>Group 4</td>
                </thead>
                <tbody>
                    <tr>
                        <td>Danceability</td>
                        <td>0.564474</td>
                        <td>0.589115</td>
                        <td>0.427017</td>
                        <td>0.506123</td>
                    </tr>
                    <tr>
                        <td>Energy</td>
                        <td>0.505093</td>
                        <td>0.603762</td>
                        <td>0.690067</td>
                        <td>0.625166</td>
                    </tr>
                    <tr>
                        <td>Loudness</td>
                        <td>-10.797166</td>
                        <td>-9.813745</td>
                        <td>-9.225017</td>
                        <td>-10.343946</td>
                    </tr>
                    <tr>
                        <td>Valence</td>
                        <td>0.471600</td>
                        <td>0.545456</td>
                        <td>0.535440</td>
                        <td>0.516104</td>
                    </tr>
                    <tr>
                        <td>Tempo</td>
                        <td>88.018297</td>
                        <td>115.790939</td>
                        <td>176.192417</td>
                        <td>140.218492</td>
                    </tr>
                    <tr>
                        <td>Acousticness</td>
                        <td>0.389773</td>
                        <td>0.299441</td>
                        <td>0.231401</td>
                        <td>0.297569</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


export default function StoryPage(){
    return(
        <div style={{textAlign:'left'}}>
            <h1>Discussion</h1>
            <p>
                Can quantifiable features of a song be used to classify a song into subjective and emotional categories?
                For example could we identify genre or mood of a song? This project is an attempt to see if this can be done
                using modern machine learning tools with easily accessible public data from Spotify.
                The data has been collected by Rodolpho Figueroa from the free tier Spotify and was published
                on <a href={'https://www.kaggle.com/datasets/rodolfofigueroa/spotify-12m-songs'}>Kaggle</a>.
                <br/><br/>
                The raw dataset comes with a number of features of a song. These features have themselves been classified
                directly by Spotifies own data scientists. Our purpose is to see if we can go further than the scores provided by Spotify.
                <br/><br/>
                <h3>The features of the dataset include:</h3>
                <ul>
                    <li><b>Acousticness</b> (float 0-1):<br/>
                        A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.
                    </li>
                    <br/>
                    <li><b>Danceability</b> (float 0-1):<br/>
                        Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.
                    </li>
                    <br/>
                    <li><b>Millisecond Duration</b> (integer):<br/>
                        The duration of the track in milliseconds.
                    </li>
                    <br/>
                    <li><b>Energy</b> (float):<br/>
                        Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
                    </li>
                    <br/>
                    <li><b>Id</b> (string):<br/>
                        The Spotify ID for the track. This appears to be some sort of hash or uuid. Either way it is unique and useful for identifying songs.
                    </li>
                    <br/>
                    <li><b>Instrumentalness</b> (float):<br/>
                        Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.
                    </li>
                    <br/>
                    <li><b>Key</b> (integer):<br/>
                        The key the track is in. Integers map to pitches using standard <a href={'https://en.wikipedia.org/wiki/Pitch_class'}>Pitch Class notation</a>. E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.
                    </li>
                    <br/>
                    <li><b>Liveness</b> (float):<br/>
                        Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.
                    </li>
                    <br/>
                    <li><b>Loudness</b> (float):<br/>
                        The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.
                    </li>
                    <br/>
                    <li><b>Mode</b> (integer):<br/>
                        Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.
                    </li>
                    <br/>
                    <li><b>Speechiness</b> (float):<br/>
                        Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.
                    </li>
                    <br/>
                    <li><b>Tempo</b> (float):<br/>
                        The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.
                    </li>
                    <br/>
                    <li><b>Time Signature</b> (integer):<br/>
                        An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".
                    </li>
                    <br/>
                    <li><b>Valence</b> (float):<br/>
                        A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
                    </li>
                </ul>

            </p>

            <br/>
            <hr/>
            <br/>
            <h1>Methodology</h1>
            <p>
                We have reduced the number of features from above to perform our analysis on. The features we have decided to use are Danceability, Energy, Loudness, Valence, Tempo, and Acousticness. While the other features are useful and could
                be used in further analysis, for our purposes we wanted to reduce the set. Below you can see details of each feature.

                <br/><br/>
                <h2>Feature Distribution</h2>
                <DistributionPaginator></DistributionPaginator>



                We can also see the breakdown of the raw data in results/year below: <br/><br/>
                <h2>Annual Mean of Each Feature</h2>
                <MeanPerYearPaginator></MeanPerYearPaginator>

                When looking at the above graphs we can see the vast majority of songs come fromm the last 20 year. While
                there is data going further back to the year 1900, it does mean that our data may be skewed to the last
                20 years.

                However, for the purposes of our analysis this is acceptable because we are trying to classify the songs
                into subjective and emotional categories. Sentiment can change over time, and so if there is a bias, it is
                a bias for modern emotional judgment.

                <br/><br/>
                <h2>Process</h2>

                We can take a look at the statistics of our chosen dataset below:
                <FeaturesTable></FeaturesTable>

                <VerticalSpacer></VerticalSpacer>
                <h3>Normalization</h3>
                Above we can see that there are features that are unaligned in scale. After scaling these values with <code>sklearn.preprocessing.MinMaxScaler()</code> we
                can see the resulting data is more suitable for learning and clustering to avoid undue impact.
                <div className={'scaled_values_img'}>
                    <img  alt={"scaled values"} src={process.env.REACT_APP_BASE_URL + "/scaled_values.png"}/>
                </div>

                <VerticalSpacer/>
                <h3>Preprocessing Clustering</h3>
                Using k-means clustering from <code>sklearn.cluster</code> we discovered the following elbow curve and have decided
                to cluster our results into 4 sets.
                <div className={'scaled_values_img'}>
                    <img  alt={"elbow curve"} src={process.env.REACT_APP_BASE_URL + "/elbow.png"}/>
                </div>

                <VerticalSpacer/>
                <h3>Fitting the data</h3>
                From here we are simply fitting the data and decomposing it to 2 dimensions for visualization. A sample of the fit data
                takes on the following form. Note that these have not been labeled yet
                <div className={'scaled_values_img'}>
                    <img  alt={"visualized pca cluster"} src={process.env.REACT_APP_BASE_URL + "/cluster_sample.png"}/>
                </div>

            </p>

            <h2>Results</h2>
            <p>
                <h3>Classes and Features</h3>
                The methodology above generated four groups as requested by k-means clustering. The following table
                shows mean data for each group
                <ResultsTable/>
                <VerticalSpacer></VerticalSpacer>
                And we can explore the data visually:
                <VerticalSpacer></VerticalSpacer>
                <SampleResultsPaginator></SampleResultsPaginator>
            </p>



            <h3>Data Analysis/resultsn</h3>
            <h3>summary/discussionn</h3>
            <h3>implicationsn</h3>
            <h3>limitationsn</h3>
        </div>
    )
}
