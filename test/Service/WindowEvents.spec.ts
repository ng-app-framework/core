import {WindowEvents} from "../../src/lib/Service/WindowEvents";

describe('Class: WindowEvents', () => {

    describe('After Instantiation', () => {
        let subject: WindowEvents;

        beforeEach(() => {
            subject = new WindowEvents();
        });

        describe('Method: Listen', () => {
            it('should call addEventListener on the window object passed', () => {
                let called = false;
                let window = {
                    addEventListener: (type: string, callback: ((event: any) => void)) => {
                        called = true;
                    }
                };
                subject.listen(<any>window);
                expect(called).toBeTruthy();
            });
            it('should not listen if the addEventListener method does not exist', () => {
                let window = {};
                subject.listen(<any>window);
            });
            it('should call onMessage from the window event', (done) => {
                let window = {
                    addEventListener: (type: string, callback: ((event: any) => void)) => {
                        callback({test: 'worked'});
                    }
                };
                subject.onMessage.first().subscribe(event => {
                    expect(event).toEqual({test: 'worked'});
                    done();
                });
                subject.listen(<any>window);
            });
        });
    });

});
