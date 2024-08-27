import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SubdivisionService } from './subdivision.service';
import { Subdivision } from '../models/subdivision.model';
import {of} from "rxjs";

describe('SubdivisionService', () => {
    let service: SubdivisionService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ SubdivisionService ]
        });
        service = TestBed.inject(SubdivisionService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Ensure that there are no outstanding requests.
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('#getSubdivisions', () => {
        it('should return expected subdivisions', () => {

            const mockSubdivisions: Subdivision[] = [
                {
                    "id": 26951,
                    "code": "001B3",
                    "name": "Alexander Park",
                    "longitude": -115.07067,
                    "latitude": 36.233263,
                    "fieldSurveyTerritoryId": 3782,
                    "marketId": 16,
                    "subdivisionStatusId": 2,
                    "surveyMethodId": 2,
                    "activeSections": 0,
                    "futureSections": 1,
                    "builtOutSections": 2,
                    "totalLots": 237,
                    "fieldSurveyTerritoryName": "EldorBI",
                    "marketName": "Las Vegas",
                    "marketAbbreviation": "LV",
                    "subdivisionStatusCode": "Future",
                    "surveyMethodCode": "DRIVE",
                    "county": "Clark",
                    "community": null,
                    "zoom17Date": "2023-08-11T18:20:25.557Z",
                    "zoom18Date": "2023-08-11T18:20:25.557Z",
                    "subdivisionGeometryId": null,
                    "subdivisionGeometryBoundingBoxId": null,
                    "subdivisionGeometryBoundaryId": null,
                    "subdivisionGeometryIntelligenceBoundaryId": 24714,
                    "subdivisionGeometryIntelligenceBoundaryStatusId": 4,
                    "subdivisionGeometryIntelligenceBoundaryStatusCode": "Finalized",
                    "subdivisionGeometryIntelligenceBoundaryStatusChangeDate": "2022-07-14T04:41:38.403Z",
                    "nearMapImageDate": "2023-06-17T18:02:42.000Z",
                    "imageBoxId": 59809,
                    "mostRecentIPointBatchDate": "2023-07-07T00:00:00.000Z",
                    "iPoints": null,
                    "validatediPoints": null,
                    "subdivisionSpecificStatus": "Future"
                } as unknown as Subdivision,
                {
                    "id": 26952,
                    "code": "001D7",
                    "name": "Searchlight and Airpark",
                    "longitude": -114.91801,
                    "latitude": 35.460599,
                    "fieldSurveyTerritoryId": 1693,
                    "marketId": 16,
                    "subdivisionStatusId": 2,
                    "surveyMethodId": 2,
                    "activeSections": 0,
                    "futureSections": 1,
                    "builtOutSections": 0,
                    "totalLots": 32,
                    "fieldSurveyTerritoryName": "Search/Air",
                    "marketName": "Las Vegas",
                    "marketAbbreviation": "LV",
                    "subdivisionStatusCode": "Future",
                    "surveyMethodCode": "DRIVE",
                    "county": "Clark",
                    "community": null,
                    "zoom17Date": "2023-07-02T18:02:02.873Z",
                    "zoom18Date": "2023-05-19T21:27:14.000Z",
                    "subdivisionGeometryId": null,
                    "subdivisionGeometryBoundingBoxId": null,
                    "subdivisionGeometryBoundaryId": null,
                    "subdivisionGeometryIntelligenceBoundaryId": 58509,
                    "subdivisionGeometryIntelligenceBoundaryStatusId": 2,
                    "subdivisionGeometryIntelligenceBoundaryStatusCode": "Default",
                    "subdivisionGeometryIntelligenceBoundaryStatusChangeDate": "2020-08-25T18:16:50.463Z",
                    "nearMapImageDate": "2022-07-06T17:13:41.000Z",
                    "imageBoxId": 59810,
                    "mostRecentIPointBatchDate": null,
                    "iPoints": null,
                    "validatediPoints": null,
                    "subdivisionSpecificStatus": "Future"
                } as unknown as Subdivision
            ];
            service.getSubdivisions().subscribe((data) => {
                expect(data.length).toBe(2);
                expect(data).toEqual(mockSubdivisions);
            });

            const req = httpMock.expectOne('http://localhost:3000/v1/subdivisions');
            expect(req.request.method).toEqual('GET');
            req.flush({subdivisions: mockSubdivisions});
        });

        it('should throw an error if service returns an error', () => {
            service.getSubdivisions().subscribe(
                (data) => fail('should have failed with a 500 error'),
                (error) => {
                    expect(error.status).toEqual(500);
                }
            );

            const req = httpMock.expectOne('http://localhost:3000/v1/subdivisions');
            // Respond with mock error
            req.flush('500 error', {status: 500, statusText: 'Server Error'});
        });
    });
});
