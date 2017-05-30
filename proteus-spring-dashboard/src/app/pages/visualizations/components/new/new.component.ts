import { VisualizationForm } from './../../VisualizationForm';
import { FormVisualization } from './../../form-visualization';
import { ChartService } from './../../../dashboard/proteic/chart.service';
import { RealtimeChart } from './../../../../realtime-chart';
import { Router } from '@angular/router';
// import { BatchChart } from './../../../../batch-chart';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Chart } from '../../../../chart.interface';
import 'style-loader!./new.scss';
import { DashboardService } from '../../../dashboard/dashboard.service';
import { DatasourceService } from '../../../dashboard/proteic/datasource.service';
import { Annotation } from '../../components/annotations/annotation';
import { AnnotationsService } from '../../components/annotations/annotations.service';

import { getAvailableVisualizations, Heatmap } from 'proteic';

@Component({
    selector: 'create-visualization',
    templateUrl: '../visualization-form.html',
    providers: []
})

export class CreateVisualization extends VisualizationForm implements OnInit, OnDestroy {

    private events: any[] = [];
    // private type: string;

    constructor(
        private chartService: ChartService,
        private router: Router,
        private annotationsService: AnnotationsService
    ) {
        super();
    }


    public save(model: RealtimeChart, isValid: boolean) {
        let self = this;
        this.submitted = true;

        let websocketEndpoint = () => {
            if(!model.calculations) { return 'C0001'; }
            if (model.calculations.size === 0) {
                return '/topic/realtime/var/' + model.variable;
            } else {
                return '/topic/flink/var/' + model.variable;
            }
        };

        function createChart(annotations: Annotation[]) {
            model = new RealtimeChart(
                model.title, 
                model.type, 
                model.configuration, 
                DatasourceService.getDefault(),
                annotations.slice(),
                model.variable,
                model.calculations,
                websocketEndpoint(),
            );
            self.chartService.push(model);
            self.router.navigate(['pages/dashboard']);
        }

        if (isValid) {
            this.annotationsService.getAnnotations()
                .then((annotations) => createChart(annotations));
        }
    }

    public _createForm() {
        this.form = FormVisualization.createForm();
    }
}
